import { CartContainer } from "@/modules/cart";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function CartPage() {
  useDocumentTitle("Meu carrinho");
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Meu carrinho</h1>
      <CartContainer />
    </div>
  );
}
