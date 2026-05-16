import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/format";
import type { CartItem } from "../../schemas";

type CartItemRowProps = {
  item: CartItem;
  onToggle: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItemRow({
  item,
  onToggle,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const { product, quantity, selected } = item;
  const effectivePrice = product.promotionalPrice ?? product.price;
  const lineTotal = effectivePrice * quantity;

  return (
    <div className="flex items-center gap-3 py-4 border-b last:border-0">
      <Checkbox
        checked={selected}
        onCheckedChange={() => onToggle(item.productId)}
        aria-label={`Selecionar ${product.name}`}
      />

      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium leading-snug">
          {product.name}
        </p>
        <div className="mt-1 flex items-center gap-2">
          {product.promotionalPrice ? (
            <>
              <span className="text-xs line-through text-muted-foreground">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm font-semibold text-accent">
                {formatCurrency(product.promotionalPrice)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.productId, quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Diminuir quantidade"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm tabular-nums">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.productId, quantity + 1)}
          aria-label="Aumentar quantidade"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="w-24 shrink-0 text-right">
        <span className="text-sm font-semibold">{formatCurrency(lineTotal)}</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(item.productId)}
        aria-label="Remover item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
