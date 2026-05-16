import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/modules/cart";
import { CheckoutContainer } from "@/modules/checkout";
import { mockAddresses } from "@/mocks";

export default function CheckoutPage() {
  const { selectedItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate("/carrinho", { replace: true });
    }
  }, [selectedItems, navigate]);

  if (selectedItems.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-2xl font-bold">Finalizar pedido</h1>
      <CheckoutContainer items={selectedItems} addresses={mockAddresses} />
    </div>
  );
}
