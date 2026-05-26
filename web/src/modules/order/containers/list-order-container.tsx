import { ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/layout/empty-state";
import { ErrorState } from "@/components/layout/error-state";
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

  if (isError)
    return <ErrorState message="Não foi possível carregar os pedidos." />;

  if (orders.length === 0)
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Nenhum pedido encontrado"
        description="Seus pedidos aparecerão aqui após a primeira compra."
      />
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
