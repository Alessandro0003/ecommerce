import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatusBadge } from "../components/order-status-badge";
import { OrderTimeline } from "../components/order-timeline";
import { formatCurrency } from "@/lib/format";
import type { Order } from "../schemas";

type OrderDetailContainerProps = {
  order: Order;
};

export function OrderDetailContainer({ order }: OrderDetailContainerProps) {
  const shortId = order.id.slice(-8).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Pedido #{shortId}</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <p className="font-semibold text-sm">Acompanhamento</p>
          </CardHeader>
          <CardContent>
            <OrderTimeline status={order.status} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <p className="font-semibold text-sm">Resumo do pedido</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-md object-cover border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × {formatCurrency(item.unitPrice)}
                  </p>
                </div>
                <span className="text-sm font-medium shrink-0">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
            <Separator />
            {order.shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span>{formatCurrency(order.shipping)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
