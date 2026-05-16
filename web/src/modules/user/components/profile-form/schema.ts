import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/\D/g, "") : val),
    z.string().min(10, "Telefone inválido").max(11, "Telefone inválido")
  ),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
