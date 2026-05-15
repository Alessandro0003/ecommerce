import { z } from "zod";

export const addressSchema = z.object({
  id: z.string(),
  zipCode: z.string().length(8),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string().length(2),
  isDefault: z.boolean(),
});
export type Address = z.infer<typeof addressSchema>;
