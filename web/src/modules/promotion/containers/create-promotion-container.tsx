import { useState } from "react";
import { toast } from "sonner";
import { PromotionForm } from "../components/promotion-form";
import type { PromotionFormValues } from "../components/promotion-form/schema";

type CreatePromotionContainerProps = {
  onSubmit: (values: PromotionFormValues) => void;
};

export function CreatePromotionContainer({
  onSubmit,
}: CreatePromotionContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: PromotionFormValues) {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit(values);
    setIsSubmitting(false);
    toast.success("Promoção criada com sucesso!");
  }

  return (
    <div className="max-w-2xl">
      <PromotionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
