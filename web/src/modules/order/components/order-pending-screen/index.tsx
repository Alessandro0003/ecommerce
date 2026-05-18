import { Clock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import type { Order } from "../../schemas";

type OrderPendingScreenProps = {
  order: Order;
};

export function OrderPendingScreen({ order }: OrderPendingScreenProps) {
  const navigate = useNavigate();
  const shortId = order.id.slice(-8).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Clock className="h-16 w-16 text-primary animate-pulse" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Processando seu pagamento...</h1>
          <p className="mt-2 text-muted-foreground">
            Estamos confirmando o pagamento. Pode levar alguns segundos.
          </p>
        </div>

        <Card className="text-left">
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pedido</span>
              <span className="font-medium">#{shortId}</span>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm gap-2"
                >
                  <span className="text-muted-foreground truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
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

        <div className="flex items-start gap-2 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground text-left">
          <Mail className="h-4 w-4 mt-0.5 shrink-0" />
          <p>
            Você receberá um e-mail assim que o pagamento for confirmado.
          </p>
        </div>

        <Button className="w-full" onClick={() => navigate("/pedidos")}>
          Acompanhar pedido
        </Button>
      </div>
    </div>
  );
}
