import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  category: z.enum(["DOG", "CAT", "BIRD", "FISH", "OTHER"]),
  price: z.coerce.number().min(0.01, "Informe um preço válido"),
  promotionalPrice: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().min(0.01).optional(),
  ),
  stock: z.coerce.number().int().min(0, "Estoque não pode ser negativo"),
  weight: z.coerce.number().min(1, "Informe o peso em gramas"),
  dimensionWidth: z.coerce.number().min(0.1, "Informe a largura"),
  dimensionHeight: z.coerce.number().min(0.1, "Informe a altura"),
  dimensionLength: z.coerce.number().min(0.1, "Informe o comprimento"),
  imagesText: z.string().min(1, "Informe pelo menos uma URL de imagem"),
  active: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
