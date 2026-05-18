import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PromotionForm } from "../components/promotion-form";
import type { PromotionFormValues } from "../components/promotion-form/schema";
import type { Promotion } from "../schemas";

type UpdatePromotionContainerProps = {
  promotion: Promotion | null;
  onClose: () => void;
  onSubmit: (id: string, values: PromotionFormValues) => void;
};

export function UpdatePromotionContainer({
  promotion,
  onClose,
  onSubmit,
}: UpdatePromotionContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: PromotionFormValues) {
    if (!promotion) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit(promotion.id, values);
    setIsSubmitting(false);
    onClose();
    toast.success("Promoção atualizada!");
  }

  if (!promotion) return null;

  const defaultValues: Partial<PromotionFormValues> = {
    title: promotion.title,
    description: promotion.description,
    targetType: promotion.productId
      ? "PRODUCT"
      : promotion.category
        ? "CATEGORY"
        : "GENERAL",
    productId: promotion.productId,
    category: promotion.category,
    discountType: promotion.discountType,
    discountValue: promotion.discountValue,
    startsAt: promotion.startsAt.slice(0, 10),
    endsAt: promotion.endsAt.slice(0, 10),
    bannerImage: promotion.bannerImage ?? "",
    active: promotion.active,
  };

  return (
    <Dialog open={promotion !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar promoção</DialogTitle>
        </DialogHeader>
        <PromotionForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
