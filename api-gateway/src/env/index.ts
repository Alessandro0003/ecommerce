import { z } from 'zod';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1),
  USERS_SERVICE_URL: z.string().url(),
  PRODUCTS_SERVICE_URL: z.string().url(),
  CHECKOUT_SERVICE_URL: z.string().url(),
  PAYMENTS_SERVICE_URL: z.string().url(),
  ALLOWED_ORIGIN: z.string().default('*'),
});

export const env = envSchema.parse(process.env);
