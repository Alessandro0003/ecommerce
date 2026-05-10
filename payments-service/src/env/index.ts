import { z } from 'zod';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3008),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  CHECKOUT_SERVICE_URL: z.string().url(),
  API_GATEWAY_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
  RABBITMQ_QUEUE_PAYMENTS: z.string().min(1),
  RABBITMQ_EXCHANGE: z.string().min(1),
});

export const env = envSchema.parse(process.env);
