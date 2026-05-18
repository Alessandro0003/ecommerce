import { ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from "../components/order-card";
import type { Order } from "../schemas";

type ListOrderContainerProps = {
  orders: Order[];
  isLoading?: boolean;
  isError?: boolean;
};

function OrderCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-14 w-14 rounded-md" />
        <Skeleton className="h-14 w-14 rounded-md" />
        <Skeleton className="h-14 w-14 rounded-md" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}

export function ListOrderContainer({
  orders,
  isLoading,
  isError,
}: ListOrderContainerProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>
    );
  }

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
