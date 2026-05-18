import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "../order-status-badge";
import { formatCurrency } from "@/lib/format";
import type { Order } from "../../schemas";

type OrderCardProps = {
  order: Order;
  onViewDetails?: (id: string) => void;
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const shortId = order.id.slice(-8).toUpperCase();
  const displayedItems = order.items.slice(0, 3);
  const remainingCount = order.items.length - 3;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">Pedido #{shortId}</span>
          <OrderStatusBadge status={order.status} />
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {formatDate(order.createdAt)}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {displayedItems.map((item) => (
            <div key={item.productId} className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-md object-cover border"
              />
              {item.quantity > 1 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {item.quantity}
                </span>
              )}
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="h-14 w-14 rounded-md border bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
              +{remainingCount}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-bold text-lg">{formatCurrency(order.total)}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(order.id)}
          >
            Ver detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
