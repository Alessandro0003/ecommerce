import { ChevronLeft, SearchX, Truck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/layout/empty-state";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { mockProducts } from "@/mocks";
import { ProductDetailContainer } from "@/modules/product";
import { ShippingCalculatorContainer } from "@/modules/shipping";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id) ?? null;
  useDocumentTitle(product?.name ?? "Produto");

  if (!product) {
    return (
      <EmptyState
        icon={SearchX}
        title="Produto não encontrado"
        description="O produto que você procura não existe ou foi removido."
        actionLabel="Voltar para a loja"
        onAction={() => navigate("/")}
      />
    );
  }

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
        <Link to="/">
          <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Voltar
        </Link>
      </Button>

      <ProductDetailContainer product={product} />

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Truck className="h-4 w-4" />
            Calcular frete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ShippingCalculatorContainer />
        </CardContent>
      </Card>
    </div>
  );
}
