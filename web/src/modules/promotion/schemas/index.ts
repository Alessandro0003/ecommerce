import { z } from "zod";

export const promotionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  discountType: z.enum(["PERCENT", "FIXED"]),
  discountValue: z.number().positive(),
  productId: z.string().optional(),
  category: z.enum(["DOG", "CAT", "BIRD", "FISH", "OTHER"]).optional(),
  startsAt: z.string(),
  endsAt: z.string(),
  active: z.boolean(),
  bannerImage: z.string().optional(),
});
export type Promotion = z.infer<typeof promotionSchema>;
