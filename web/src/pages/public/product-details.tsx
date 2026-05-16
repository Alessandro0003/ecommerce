import { ChevronLeft, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProducts } from "@/mocks";
import { ProductDetailContainer } from "@/modules/product";
import { ShippingCalculatorContainer } from "@/modules/shipping";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === id) ?? null;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para a loja
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
        <Link to="/">
          <ChevronLeft className="mr-1 h-4 w-4" />
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
