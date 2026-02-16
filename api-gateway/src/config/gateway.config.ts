export const serviceConfig = {
  users: {
    url: process.env.USERS_SERVICE_URL || 'http://localhost:3005',
    timeout: 10000, // ms -> 1 seg
  },
  products: {
    url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3006',
    timeout: 10000, // ms -> 1 seg
  },
  checkout: {
    url: process.env.CHECKOUT_SERVICE_URL || 'http://localhost:3007',
    timeout: 10000, // ms -> 1 seg
  },
  payments: {
    url: process.env.PAYMENTS_SERVICE_URL || 'http://localhost:3008',
    timeout: 10000, // ms -> 1 seg
  },
};
