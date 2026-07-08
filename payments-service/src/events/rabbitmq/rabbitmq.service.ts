import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import * as amqp from 'amqplib';
import { env } from '../../env';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);
  private connection: amqp.ChannelModel | undefined;
  private channel: amqp.Channel | undefined;

  constructor() {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  async waitForConnection(maxAttempts = 10, delayMs = 500): Promise<boolean> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (this.channel) {
        return true;
      }

      this.logger.log(
        `⌛ Waiting for RabbitMQ connection... (attempt ${attempt}/ ${maxAttempts})`,
      );

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    return false;
  }

  private async connect() {
    try {
      this.connection = await amqp.connect(env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();

      this.logger.log('✅ Connected to RabbitMQ successfully');

      // Events listeners para monitorar a conexão
      this.connection.on('error', (err) => {
        this.logger.error('❌ RabbitMQ connection error', err);
      });

      this.connection.on('close', () => {
        this.logger.warn('⚠️ RabbitMQ connection closed');
      });

      this.channel.on('blocked', (reason) => {
        this.logger.warn(`⚠️ RabbitMQ channel blocked: ${reason}`);
      });

      this.channel.on('unblocked', () => {
        this.logger.log('✅ RabbitMQ channel unblocked');
      });
    } catch (error) {
      this.logger.warn(
        '⚠️ Failed to connect to RabbitMQ, retrying in 5 seconds...',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
  private async disconnect() {
    try {
      // Fecha o canal
      if (this.channel) {
        await this.channel.close();
        this.logger.log('✅ RabbitMQ channel closed');
      }

      // Fecha a conexão
      if (this.connection) {
        await this.connection.close();
        this.logger.log('✅ RabbitMQ connection closed');
      }
    } catch (error) {
      this.logger.error(
        '❌ Error disconnecting from RabbitMQ',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  getChannel(): amqp.Channel | undefined {
    return this.channel;
  }

  getConnection(): amqp.ChannelModel | undefined {
    return this.connection;
  }

  async publishMessage(
    exchange: string,
    routineKey: string,
    message: any,
  ): Promise<void> {
    try {
      if (!this.channel) {
        this.logger.warn(
          '⚠️ RabbitMQ channel is not available, cannot publish message',
        );
        return;
      }

      await this.channel.assertExchange(exchange, 'topic', { durable: true });

      const messageBuffer = Buffer.from(JSON.stringify(message));
      const published = this.channel.publish(
        exchange,
        routineKey,
        messageBuffer,
        {
          persistent: true, // Garante que a mensagem seja persistida no RabbitMQ
          timestamp: Date.now(), // Adiciona um timestamp para rastreamento
          contentType: 'application/json', // Define o tipo de conteúdo para JSON
        },
      );

      if (!published) {
        throw new Error('Failed to publish message to RabbitMQ');
      }

      this.logger.log('✅ Message published to RabbitMQ');
      this.logger.debug(`Message cotent: ${JSON.stringify(message)}`);
    } catch (error) {
      this.logger.error(
        '❌ Error publishing message to RabbitMQ',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async subscribeToQueue(
    queueName: string,
    exchange: string,
    routingKey: string,
    callback: (message: unknown) => Promise<void>,
    options: {
      maxRetries?: number;
      retryDelayMs?: number;
    } = {},
  ): Promise<void> {
    const maxRetries = options.maxRetries ?? 3;
    const retryDelayMs = options.retryDelayMs ?? 30000; // 30 segundos

    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel not available');
      }

      await this.channel.assertExchange(exchange, 'topic', {
        durable: true,
      });

      const retryExchange = `${exchange}.retry.dlx`;
      await this.channel.assertExchange(retryExchange, 'topic', {
        durable: true,
      });

      // DLQ
      const dlxExchange = `${exchange}.dlx`;
      await this.channel.assertExchange(dlxExchange, 'topic', {
        durable: true,
      });

      const dlqName = `${queueName}.dlq`;
      await this.channel.assertQueue(dlqName, {
        durable: true,
        arguments: {
          'x-message-ttl': 604800000, // 7 dias para análise
        },
      });

      const routingKeyDlq = `${routingKey}.dlq`;
      await this.channel.bindQueue(dlqName, dlxExchange, routingKeyDlq);

      // Retry

      const routingKeyRetry = `${routingKey}.retry`;

      const retryQueueName = `${queueName}.retry`;
      await this.channel.assertQueue(retryQueueName, {
        durable: true,
        arguments: {
          'x-message-ttl': retryDelayMs, // ⏱️ Tempo de espera antes do retry
          // Quando TTL expira, volta para o exchange PRINCIPAL
          'x-dead-letter-exchange': exchange,
          'x-dead-letter-routing-key': routingKey,
        },
      });

      await this.channel.bindQueue(
        retryQueueName,
        retryExchange,
        routingKeyRetry,
      );

      // Main Queue
      const queue = await this.channel.assertQueue(queueName, {
        durable: true,
        arguments: {
          'x-message-ttl': 86400000,
          'x-max-length': 10000,
          'x-dead-letter-exchange': retryExchange,
          'x-dead-letter-routing-key': routingKeyRetry,
        },
      });

      await this.channel.bindQueue(queue.queue, exchange, routingKey);

      await this.channel.prefetch(1);

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await this.channel.consume(queue.queue, async (msg) => {
        if (msg) {
          try {
            const message: unknown = JSON.parse(msg.content.toString());
            this.logger.log(`📨 Message received from queue: ${queueName}`);
            this.logger.debug(`Message content: ${JSON.stringify(message)}`);

            const retryCount = this.getRetryCount(msg);
            this.logger.log(
              `📨 Message received (attempt ${retryCount + 1}/${maxRetries + 1})`,
            );

            await callback(message);

            this.channel?.ack(msg);

            this.logger.log(
              `✅ Message processed succesfully from queue: ${queueName}`,
            );
          } catch (error) {
            const retryCount = this.getRetryCount(msg);
            if (retryCount < maxRetries) {
              this.logger.warn(
                `⚠️ Processing failed (attempt ${retryCount + 1}/${maxRetries + 1}).` +
                  `Retrying int ${retryDelayMs / 1000}s...`,
              );
              this.channel?.nack(msg, false, false);
            } else {
              this.logger.error(
                `☠️ Max retries (${maxRetries}) exceeded. Sending to DLQ.`,
              );

              // Publica diretamente na DLQ (bypass da retry queue)
              this.channel?.publish(
                dlxExchange,
                `${routingKey}.dlq`,
                msg.content,
                { persistent: true, headers: msg.properties.headers },
              );
              this.channel?.ack(msg); // Remove da fila principal 2
            }
            this.logger.error(`❌ Error processing message:`, error);
            this.logger.warn(`⚠️ Message sent to DLQ: ${dlqName}`);
          }
        }
      });

      this.logger.log(
        `✅ Subscribed to queue: ${queueName} with routing key: ${routingKey}`,
      );
      this.logger.log(
        `🔄️ Retry queue: ${retryQueueName} (${retryDelayMs}ms delay)`,
      );
      this.logger.log(`☠️ Dead letter queue: ${dlqName}`);
    } catch (error) {
      this.logger.error(`❌ Error subscribing to queue ${queueName}:`, error);
    }
  }

  /**
   * Extrai o numero de retries do header x-death
   * O RabbitMQ adiciona esse header automaticamente
   */
  private getRetryCount(msg: amqp.ConsumeMessage): number {
    const xDeath = msg.properties.headers?.['x-death'] as
      | Array<{
          count: number;
          queue: string;
        }>
      | undefined;

    if (!xDeath || xDeath.length === 0) return 0;

    // Soma todas as vezes que passou pela fila principal
    return xDeath
      .filter((death) => !death.queue.endsWith('.retry'))
      .reduce((sum, death) => sum + (death.count || 0), 0);
  }
}
