import { Tag } from "lucide-react";
import { EmptyState } from "@/components/layout/empty-state";
import { PromotionCard } from "../components/promotion-card";
import type { Promotion } from "../schemas";

type ListPromotionContainerProps = {
  promotions: Promotion[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ListPromotionContainer({
  promotions,
  onEdit,
  onDelete,
}: ListPromotionContainerProps) {
  if (promotions.length === 0)
    return (
      <EmptyState
        icon={Tag}
        title="Nenhuma promoção encontrada"
        description="Crie uma nova promoção para que ela apareça aqui."
      />
    );

  return (
    <div className="space-y-3">
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
