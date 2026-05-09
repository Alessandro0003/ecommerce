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

  private async connect() {
    try {
      this.connection = await amqp.connect(env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();

      this.logger.log('✅ Connected to RabbitMQ');

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
}
