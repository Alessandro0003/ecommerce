import { z } from "zod";

export const productCategorySchema = z.enum([
  "DOG",
  "CAT",
  "BIRD",
  "FISH",
  "OTHER",
]);
export type ProductCategory = z.infer<typeof productCategorySchema>;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: productCategorySchema,
  price: z.number().positive(),
  promotionalPrice: z.number().positive().optional(),
  stock: z.number().int().min(0),
  weight: z.number().positive(),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    length: z.number(),
  }),
  images: z.array(z.string().url()),
  active: z.boolean(),
});
export type Product = z.infer<typeof productSchema>;
