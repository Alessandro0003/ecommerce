import { z } from 'zod';
import { config } from 'dotenv';
import { resolve } from 'path';

// Carrega o arquivo .env ANTES de validar as variáveis
config({ path: resolve(__dirname, '../../.env') });

const envSchema = z.object({
  PORT: z.string().default('3000'),
  JWT_SECRET: z.string(),
  USERS_SERVICE_URL: z.string(),
  PRODUCTS_SERVICE_URL: z.string(),
  CHECKOUT_SERVICE_URL: z.string(),
  PAYMENTS_SERVICE_URL: z.string(),
  ALLOWED_ORIGIN: z.string().default('*'),
});

export const env = envSchema.parse(process.env);
