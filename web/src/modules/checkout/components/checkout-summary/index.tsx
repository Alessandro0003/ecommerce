import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import type { CheckoutSummaryProps } from "./types";

export function CheckoutSummary({ items, shipping }: CheckoutSummaryProps) {
  const subtotal = items.reduce((acc, item) => {
    const price = item.product.promotionalPrice ?? item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const total = subtotal + (shipping?.price ?? 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compact item list */}
        <div className="space-y-3">
          {items.map((item) => {
            const price = item.product.promotionalPrice ?? item.product.price;
            return (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                    {item.quantity}
                  </span>
                </div>
                <p className="flex-1 truncate text-sm">{item.product.name}</p>
                <span className="shrink-0 text-sm font-medium">
                  {formatCurrency(price * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Frete</span>
            {shipping ? (
              <span>
                {shipping.carrier} {shipping.service} ·{" "}
                {formatCurrency(shipping.price)}
              </span>
            ) : (
              <span className="italic">a calcular</span>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-lg">{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
