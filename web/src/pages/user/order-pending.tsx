import { useParams } from "react-router-dom";
import { OrderPendingContainer } from "@/modules/order";
import { mockOrders } from "@/mocks";
import type { Order } from "@/modules/order";

const FALLBACK_ORDER: Order = {
  id: "order-new",
  userId: "user-1",
  status: "PENDING",
  items: [
    {
      productId: "prod-1",
      name: "Produto do seu pedido",
      image:
        "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&q=80",
      quantity: 1,
      unitPrice: 0,
    },
  ],
  subtotal: 0,
  shipping: 0,
  total: 0,
  shippingAddressId: "addr-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function OrderPendingPage() {
  const { id } = useParams<{ id: string }>();
  const order = mockOrders.find((o) => o.id === id) ?? FALLBACK_ORDER;

  return <OrderPendingContainer order={order} />;
}
