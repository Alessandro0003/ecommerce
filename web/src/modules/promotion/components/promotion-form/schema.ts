import { z } from "zod";

export const promotionFormSchema = z
  .object({
    title: z.string().min(3, "Mínimo 3 caracteres"),
    description: z.string().min(10, "Mínimo 10 caracteres"),
    targetType: z.enum(["PRODUCT", "CATEGORY", "GENERAL"]),
    productId: z.string().optional(),
    category: z.enum(["DOG", "CAT", "BIRD", "FISH", "OTHER"]).optional(),
    discountType: z.enum(["PERCENT", "FIXED"]),
    discountValue: z.number({ invalid_type_error: "Informe um valor numérico" }),
    startsAt: z.string().min(1, "Informe a data de início"),
    endsAt: z.string().min(1, "Informe a data de fim"),
    bannerImage: z.string().url("URL inválida").optional().or(z.literal("")),
    active: z.boolean(),
  })
  .refine((data) => data.endsAt > data.startsAt, {
    message: "A data de fim deve ser após a data de início",
    path: ["endsAt"],
  })
  .refine(
    (data) => {
      if (data.discountType === "PERCENT") {
        return data.discountValue > 0 && data.discountValue <= 100;
      }
      return data.discountValue > 0;
    },
    (data) => ({
      message:
        data.discountType === "PERCENT"
          ? "Desconto em % deve ser entre 1 e 100"
          : "Valor deve ser positivo",
      path: ["discountValue"],
    }),
  );

export type PromotionFormValues = z.infer<typeof promotionFormSchema>;
