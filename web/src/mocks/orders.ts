import type { Order } from "@/modules/order";

export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    status: "PENDING",
    items: [
      {
        productId: "prod-1",
        name: "Ração Premium para Cães Adultos 15kg",
        image:
          "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&q=80",
        quantity: 1,
        unitPrice: 159.9,
      },
      {
        productId: "prod-11",
        name: "Petisco Bifinho de Carne Bovina 500g",
        image:
          "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=200&q=80",
        quantity: 2,
        unitPrice: 19.9,
      },
    ],
    subtotal: 199.7,
    shipping: 18.9,
    total: 218.6,
    shippingAddressId: "addr-1",
    createdAt: "2026-05-14T20:30:00.000Z",
    updatedAt: "2026-05-14T20:30:00.000Z",
  },
  {
    id: "order-2",
    userId: "user-1",
    status: "PROCESSING",
    items: [
      {
        productId: "prod-7",
        name: "Aquário 30L com Kit Completo",
        image:
          "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=200&q=80",
        quantity: 1,
        unitPrice: 299.9,
      },
    ],
    subtotal: 299.9,
    shipping: 32.5,
    total: 332.4,
    shippingAddressId: "addr-1",
    createdAt: "2026-05-12T14:00:00.000Z",
    updatedAt: "2026-05-12T14:15:00.000Z",
  },
  {
    id: "order-3",
    userId: "user-1",
    status: "PAID",
    items: [
      {
        productId: "prod-3",
        name: "Brinquedo Mordedor de Borracha Natural",
        image:
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80",
        quantity: 1,
        unitPrice: 32.9,
      },
      {
        productId: "prod-5",
        name: "Comedouro Inox Duplo Antiderrapante",
        image:
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=80",
        quantity: 1,
        unitPrice: 67.9,
      },
    ],
    subtotal: 100.8,
    shipping: 25.0,
    total: 125.8,
    shippingAddressId: "addr-2",
    createdAt: "2026-05-08T09:45:00.000Z",
    updatedAt: "2026-05-08T10:00:00.000Z",
  },
  {
    id: "order-4",
    userId: "user-1",
    status: "SHIPPED",
    items: [
      {
        productId: "prod-9",
        name: "Gaiola para Pássaros Canários Luxo",
        image:
          "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=200&q=80",
        quantity: 1,
        unitPrice: 149.9,
      },
      {
        productId: "prod-8",
        name: "Ração para Peixes Tropicais 100g",
        image:
          "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=200&q=80",
        quantity: 3,
        unitPrice: 12.9,
      },
    ],
    subtotal: 188.6,
    shipping: 18.9,
    total: 207.5,
    shippingAddressId: "addr-1",
    createdAt: "2026-05-01T11:20:00.000Z",
    updatedAt: "2026-05-05T08:00:00.000Z",
  },
  {
    id: "order-5",
    userId: "user-1",
    status: "DELIVERED",
    items: [
      {
        productId: "prod-6",
        name: "Casinha para Cães de Porte Médio",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80",
        quantity: 1,
        unitPrice: 389.9,
      },
      {
        productId: "prod-10",
        name: "Shampoo Neutro para Cães 500ml",
        image:
          "https://images.unsplash.com/photo-1612160609504-334df7826195?w=200&q=80",
        quantity: 2,
        unitPrice: 28.9,
      },
    ],
    subtotal: 447.7,
    shipping: 0,
    total: 447.7,
    shippingAddressId: "addr-3",
    createdAt: "2026-04-28T16:00:00.000Z",
    updatedAt: "2026-05-03T14:30:00.000Z",
  },
];
