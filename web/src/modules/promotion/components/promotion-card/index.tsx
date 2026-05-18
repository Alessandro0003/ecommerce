import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { PromotionCardProps } from "./types";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function PromotionCard({ promotion, onEdit, onDelete }: PromotionCardProps) {
  const discountLabel =
    promotion.discountType === "PERCENT"
      ? `${promotion.discountValue}% OFF`
      : `${formatCurrency(promotion.discountValue)} OFF`;

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div className="shrink-0">
          {promotion.bannerImage ? (
            <img
              src={promotion.bannerImage}
              alt={promotion.title}
              className="h-16 w-24 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-16 w-24 items-center justify-center rounded-md bg-muted">
              <span className="text-xs text-muted-foreground">Sem imagem</span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-2">
            <h3 className="flex-1 text-sm font-semibold leading-tight">
              {promotion.title}
            </h3>
            <Badge variant={promotion.active ? "default" : "secondary"}>
              {promotion.active ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(promotion.startsAt)} → {formatDate(promotion.endsAt)}
          </p>
          <p className="mt-0.5 text-xs font-medium text-accent">
            {discountLabel}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit?.(promotion.id)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete?.(promotion.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
