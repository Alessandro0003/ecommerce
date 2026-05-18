import { OrderPendingScreen } from "../components/order-pending-screen";
import type { Order } from "../schemas";

type OrderPendingContainerProps = {
  order: Order;
};

export function OrderPendingContainer({ order }: OrderPendingContainerProps) {
  return <OrderPendingScreen order={order} />;
}
