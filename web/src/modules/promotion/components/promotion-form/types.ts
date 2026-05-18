import type { PromotionFormValues } from "./schema";

export type PromotionFormProps = {
  defaultValues?: Partial<PromotionFormValues>;
  onSubmit: (values: PromotionFormValues) => void;
  isSubmitting?: boolean;
};
