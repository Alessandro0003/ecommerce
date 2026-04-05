import { z } from 'zod';
import { config } from 'dotenv';
import { resolve } from 'path';

// Carrega o arquivo .env ANTES de validar as variáveis
config({ path: resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATEBASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
