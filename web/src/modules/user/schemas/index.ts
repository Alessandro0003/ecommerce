import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  cpf: z.string().length(11),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
