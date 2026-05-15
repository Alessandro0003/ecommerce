import { z } from "zod";
import { productSchema } from "@/modules/product/schemas";

export const cartItemSchema = z.object({
  productId: z.string(),
  product: productSchema,
  quantity: z.number().int().positive(),
  selected: z.boolean(),
});
export type CartItem = z.infer<typeof cartItemSchema>;
