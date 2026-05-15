import { ShoppingCart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { ProductCardProps } from "./types";

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const effectivePrice = product.promotionalPrice ?? product.price;
  const hasFreeShipping = effectivePrice > 99;

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.promotionalPrice && (
          <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">
            OFERTA
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-3">
        <p className="line-clamp-2 text-sm font-medium leading-snug">
          {product.name}
        </p>

        <div className="mt-auto flex flex-col gap-0.5">
          {product.promotionalPrice ? (
            <>
              <span className="text-xs line-through text-muted-foreground">
                {formatCurrency(product.price)}
              </span>
              <span className="text-2xl font-bold text-accent">
                {formatCurrency(product.promotionalPrice)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {hasFreeShipping && (
          <Badge
            variant="outline"
            className="w-fit border-success text-xs text-success"
          >
            <Truck className="mr-1 h-3 w-3" />
            Frete grátis
          </Badge>
        )}
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="sm"
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
