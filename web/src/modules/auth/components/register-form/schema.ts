import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(3, "Mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    phone: z.preprocess(
      (v) => (typeof v === "string" ? v.replace(/\D/g, "") : v),
      z.string().min(10, "Telefone inválido").max(11, "Telefone inválido"),
    ),
    cpf: z.preprocess(
      (v) => (typeof v === "string" ? v.replace(/\D/g, "") : v),
      z.string().length(11, "CPF deve ter 11 dígitos"),
    ),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, "Você deve aceitar os termos de uso"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
