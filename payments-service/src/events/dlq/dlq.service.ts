import { Injectable, Logger } from '@nestjs/common';
import { DlqMessage, DlqStats } from './dlq.interface';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { PaymentsOrderMessage } from '../payment-queue.interface';

@Injectable()
export class DlqService {
  private readonly logger = new Logger(DlqService.name);

  private readonly DLQ_NAME = 'payment_queue.dlq';
  private readonly EXCHANGE = 'payments';
  private readonly ROUTING_KEY = 'payment.order';

  constructor(private readonly rabbitmqService: RabbitmqService) {}

  /**
   * Obter estatistica do DLQ
   */

  async getStats(): Promise<DlqStats> {
    const channel = this.rabbitmqService.getChannel();

    if (!channel) {
      throw new Error('RabbitMQ channel not available');
    }

    const queueInfo = await channel.checkQueue(this.DLQ_NAME);

    return {
      queueName: this.DLQ_NAME,
      messageCount: queueInfo.messageCount,
      consumerCount: queueInfo.consumerCount,
    };
  }

  /**
   * Obter a mensagem da DLQ sem removelas (peek)
   * Usa o conceito de "get" com nack para visualizar sem consumir
   */

  async peekMessage(limit: number = 10): Promise<DlqMessage[]> {
    const channel = this.rabbitmqService.getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel not available');
    }

    const messages: DlqMessage[] = [];

    await channel.checkQueue(this.DLQ_NAME);

    for (let i = 0; i < limit; i++) {
      const msg = await channel.get(this.DLQ_NAME, { noAck: false });

      if (!msg) {
        break; // Não ha mais mensagem
      }

      try {
        const contentMessage = JSON.parse(
          msg.content.toString(),
        ) as PaymentsOrderMessage;

        // Extrai as informações desta mensagem
        const xDeath = msg.properties.headers?.['x-death'] as
          | Array<{
              reason: string;
              queue: string;
              time: { getTime: () => number };
              count: number;
              exchange: string;
              'routing-keys': string[];
            }>
          | undefined;

        const deathInfo = xDeath?.[0]
          ? {
              reason: xDeath[0].reason,
              queue: xDeath[0].queue,
              time: new Date(xDeath[0].time?.getTime?.() || Date.now()),
              count: xDeath[0].count,
              exchange: xDeath[0].exchange,
              routingKeys: xDeath[0]['routing-keys'],
            }
          : undefined;

        const headers =
          msg.properties.headers && typeof msg.properties.headers === 'object'
            ? (msg.properties.headers as Record<string, unknown>)
            : undefined;

        messages.push({
          content: contentMessage,
          properties: {
            messageId: msg.properties.messageId as string | undefined,
            timestamp: msg.properties.timestamp as number | undefined,
            headers,
          },
          deathInfo,
        });

        channel.nack(msg, false, true);
      } catch (error) {
        channel.nack(msg, false, true);
        this.logger.error('Failed to parse DLQ message:', error);
      }
    }
    return messages;
  }

  /**
   * Reprocessa uma mensagem especifica da DLQ
   * Remove da DLQ e publica na fila principal
   */

  async reprocessMessage(orderId: string): Promise<boolean> {
    const channel = this.rabbitmqService.getChannel();

    if (!channel) {
      throw new Error('RabbitMQ channel not available');
    }

    const stats = await this.getStats();
    let found = false;

    for (let i = 0; i < stats.messageCount; i++) {
      const msg = await channel.get(this.DLQ_NAME, { noAck: false });

      if (!msg) break;

      try {
        const contentMessage = JSON.parse(
          msg.content.toString(),
        ) as PaymentsOrderMessage;

        if (contentMessage.orderId === orderId) {
          // Econtrou, Republica na fila principal
          await this.rabbitmqService.publishMessage(
            this.EXCHANGE,
            this.ROUTING_KEY,
            contentMessage,
          );

          // Remove da DLQ (ack)
          channel.ack(msg);

          found = true;

          this.logger.log(`✅ Message ${orderId} reprocessed successfully`);
          break;
        } else {
          channel.nack(msg, false, true);
        }
      } catch (error) {
        channel.nack(msg, false, true);
        this.logger.error('Failed to process DLQ message:', error);
      }
    }

    return found;
  }

  /**
   * Reprocessa todas as mensagem da DLQ
   */

  async reprocessAll(): Promise<{ processed: number; failed: number }> {
    const channel = this.rabbitmqService.getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel not available');
    }

    const stats = await this.getStats();
    const processed = 0;
    const failed = 0;

    this.logger.log(`🔄️ Reprocessing ${stats.messageCount} messages from DLQ`);

    for (let i = 0; i < stats.messageCount; i++) {
      const msg = await channel.get(this.DLQ_NAME, { noAck: false });
      if (!msg) break;

      try {
        const contentMessage = JSON.parse(
          msg.content.toString(),
        ) as PaymentsOrderMessage;

        // Republica na fila principal
        await this.rabbitmqService.publishMessage(
          this.EXCHANGE,
          this.ROUTING_KEY,
          contentMessage,
        );

        this.logger.log(`✅ Reprocessed order ${contentMessage.orderId}`);
      } catch (error) {
        channel.nack(msg, false, true);
        this.logger.error('Failed to processing DLQ message:', error);
      }
    }

    this.logger.log(
      `🏁 Reprocess complete: ${processed} processed, ${failed} failed`,
    );

    return { processed, failed };
  }

  /**
   * Remove uma mensagem da DLQ (descarta permanentemente)
   */

  async discardMessage(orderId: string): Promise<boolean> {
    const channel = this.rabbitmqService.getChannel();
    if (!channel) {
      throw new Error('RabbitMQ to channel availabel');
    }

    const stats = await this.getStats();
    let found = false;

    for (let i = 0; i < stats.messageCount; i++) {
      const msg = await channel.get(this.DLQ_NAME, { noAck: false });
      if (!msg) break;

      try {
        const contentMessage = JSON.parse(
          msg.content.toString(),
        ) as PaymentsOrderMessage;

        if (contentMessage.orderId === orderId) {
          // Encontrou, Remove permanentemente (ack sem reprocessar)
          channel.ack(msg);
          found = true;
        } else {
          // Não e a mensagem devolve
          channel.nack(msg, false, true);
        }
      } catch (error) {
        channel.nack(msg, false, true);
        this.logger.error('Failed to discard DLQ message', error);
      }
    }

    return found;
  }

  /**
   * Limpa toda a DLQ
   */

  async purgeAll(): Promise<number> {
    const channel = this.rabbitmqService.getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel not available');
    }

    const result = await channel.purgeQueue(this.DLQ_NAME);
    this.logger.warn(`🗑️ Purged ${result.messageCount} messages from DLQ`);

    return result.messageCount;
  }
}
