import { PaymentsOrderMessage } from '../payment-queue.interface';

export interface DlqMessage {
  content: PaymentsOrderMessage;
  properties: {
    messageId?: string;
    timestamp?: number;
    headers?: Record<string, unknown>;
  };
  deathInfo?: {
    reason: string;
    queue: string;
    time: Date;
    count: number;
    exchange: string;
    routingKeys: string[];
  };
}

export interface DlqStats {
  queueName: string;
  messageCount: number;
  consumerCount: number;
}
