import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
      <h2 className="mt-4 text-xl font-semibold">Seu carrinho está vazio</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Explore nossa loja e adicione produtos ao carrinho.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Ir para a loja</Link>
      </Button>
    </div>
  );
}
