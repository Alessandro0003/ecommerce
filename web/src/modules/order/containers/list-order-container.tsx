import { ShoppingBag } from "lucide-react";
import { OrderCard } from "../components/order-card";
import { OrderListSkeleton } from "../components/order-list-skeleton";
import type { Order } from "../schemas";

type ListOrderContainerProps = {
  orders: Order[];
  isLoading?: boolean;
  isError?: boolean;
};

export function ListOrderContainer({
  orders,
  isLoading,
  isError,
}: ListOrderContainerProps) {
  if (isLoading) return <OrderListSkeleton count={4} />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="font-medium text-destructive">
          Erro ao carregar pedidos.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Tente novamente em alguns instantes.
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Nenhum pedido encontrado</p>
          <p className="text-sm text-muted-foreground mt-1">
            Seus pedidos aparecerão aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
