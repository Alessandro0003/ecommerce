import { env } from '../env';

export const serviceConfig = {
  users: {
    url: env.USERS_SERVICE_URL || 'http://localhost:3005',
    timeout: 10000, // ms -> 1 seg
  },
  products: {
    url: env.PRODUCTS_SERVICE_URL || 'http://localhost:3006',
    timeout: 10000, // ms -> 1 seg
  },
  checkout: {
    url: env.CHECKOUT_SERVICE_URL || 'http://localhost:3007',
    timeout: 10000, // ms -> 1 seg
  },
  payments: {
    url: env.PAYMENTS_SERVICE_URL || 'http://localhost:3008',
    timeout: 10000, // ms -> 1 seg
  },
};
