import { Tag } from "lucide-react";
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
  if (promotions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="rounded-full bg-muted p-6">
          <Tag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Nenhuma promoção encontrada</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie uma nova promoção para aparecer aqui.
          </p>
        </div>
      </div>
    );
  }

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
