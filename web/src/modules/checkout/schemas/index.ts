import { z } from "zod";

export const paymentMethodSchema = z.enum(["PIX", "CREDIT_CARD", "BOLETO"]);
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
