import { z } from "zod";

export const orderStatusSchema = z.enum([
  "PENDING",
  "PROCESSING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "FAILED",
  "CANCELLED",
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: orderStatusSchema,
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      image: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    }),
  ),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
  shippingAddressId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Order = z.infer<typeof orderSchema>;
