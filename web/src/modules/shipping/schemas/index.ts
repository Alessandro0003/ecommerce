import { z } from "zod";

export const shippingOptionSchema = z.object({
  carrier: z.string(),
  service: z.string(),
  price: z.number(),
  deadlineDays: z.number().int(),
});
export type ShippingOption = z.infer<typeof shippingOptionSchema>;
