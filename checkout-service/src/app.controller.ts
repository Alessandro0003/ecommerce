import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentsOrderMessage } from './events/payments-queue.interface';
import { PaymentQueueService } from './events/payment-queue/payment-queue.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly paymentQueue: PaymentQueueService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/message')
  async sendMessage(@Body() body?: Partial<PaymentsOrderMessage>) {
    const message: PaymentsOrderMessage = {
      orderId: body?.orderId || `test-order-${Date.now()}`,
      userId: body?.userId || `test-user-123`,
      amount: body?.amount || 199.99,
      items: body?.items || [
        {
          productId: 'product-1',
          quantity: 2,
          price: 99.99,
        },
      ],
      paymentMethod: body?.paymentMethod || 'credit_card',
      description: body?.description || 'Mensagem de test',
      createdAt: body?.createdAt || new Date(),
    };

    await this.paymentQueue.publishPaymentOrder(message);

    return {
      success: true,
      message: 'Mensagem enviada para o RabbitMQ',
      data: message,
    };
  }
}
