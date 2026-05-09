import { Injectable, Logger } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { PaymentsOrderMessage } from '../payments-queue.interface';

@Injectable()
export class PaymentQueueService {
  private readonly logger = new Logger(PaymentQueueService.name);

  private readonly ROUTING_KEY = 'payment.order';
  private readonly EXCHANGE = 'payment';

  constructor(private readonly rabbitMQService: RabbitmqService) {}

  async publishPaymentOrder(paymentOrder: PaymentsOrderMessage): Promise<void> {
    this.logger.log(
      `📤 Publishing payment order for orderId: ${paymentOrder.orderId}`,
    );

    try {
      const enrichmentMessage: PaymentsOrderMessage = {
        ...paymentOrder,
        createdAt: paymentOrder.createdAt || new Date(),
        metadata: {
          service: 'checkout-service',
          timestamp: new Date().toISOString(),
        },
      };

      await this.rabbitMQService.publishMessage(
        this.EXCHANGE, // Para onde vai ser enviado
        this.ROUTING_KEY, // Como vai ser roteado
        enrichmentMessage,
      );

      this.logger.log('✅Payment order published successfully');
      this.logger.debug(
        `📦 Message content: ${JSON.stringify(enrichmentMessage)}`,
      );
    } catch (error) {
      this.logger.error(
        `❌ Failed to publish payment order: orderId=${paymentOrder.orderId}`,
      );
      throw error;
    }
  }

  private validatePaymentOrder(paymentOrder: PaymentsOrderMessage): boolean {
    if (!paymentOrder.orderId) {
      this.logger.error('❌ Invalid payment order: Missing orderId');
      return false;
    }

    if (!paymentOrder.userId) {
      this.logger.error('❌ Invalid payment order: Missing userId');
      return false;
    }

    if (!paymentOrder.amount || paymentOrder.amount <= 0) {
      this.logger.error('❌ Invalid payment order: invalid amount');
      return false;
    }

    if (!paymentOrder.items || paymentOrder.items.length === 0) {
      this.logger.error('❌ Invalid payment order: No items provided');
      return false;
    }

    return true;
  }

  async publishPaymentOrderSafe(
    paymentOrder: PaymentsOrderMessage,
  ): Promise<void> {
    if (!this.validatePaymentOrder(paymentOrder)) {
      throw new Error('Invalid payment order data');
    }

    await this.publishPaymentOrder(paymentOrder);
  }
}
