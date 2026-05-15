import { Package, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/format";
import { ProductGallery } from "../gallery";
import type { Product } from "../../schemas";

type ProductDetailsProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  DOG: "Cães",
  CAT: "Gatos",
  BIRD: "Aves",
  FISH: "Peixes",
  OTHER: "Outros",
};

export function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  const effectivePrice = product.promotionalPrice ?? product.price;
  const discountPercent = product.promotionalPrice
    ? Math.round((1 - product.promotionalPrice / product.price) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              {CATEGORY_LABELS[product.category] ?? product.category}
            </Badge>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              (47 avaliações)
            </span>
          </div>

          <Separator />

          <div className="flex flex-col gap-1">
            {product.promotionalPrice ? (
              <>
                <span className="text-sm line-through text-muted-foreground">
                  De: {formatCurrency(product.price)}
                </span>
                <span className="text-3xl font-bold text-accent">
                  {formatCurrency(product.promotionalPrice)}
                </span>
                <Badge className="w-fit bg-destructive text-destructive-foreground">
                  {discountPercent}% OFF
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            {product.stock > 0 ? (
              <span className="font-medium text-success">
                Em estoque ({product.stock} unidades)
              </span>
            ) : (
              <span className="font-medium text-destructive">
                Fora de estoque
              </span>
            )}
          </div>

          <p className="line-clamp-3 text-sm text-muted-foreground">
            {product.description}
          </p>

          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={product.stock === 0}
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar ao Carrinho
          </Button>

          {effectivePrice > 99 && (
            <p className="text-sm font-medium text-success">
              ✓ Frete grátis para todo o Brasil
            </p>
          )}
        </div>
      </div>

      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Descrição</TabsTrigger>
          <TabsTrigger value="specs">Especificações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </TabsContent>

        <TabsContent value="specs" className="mt-4">
          <div className="grid gap-0 text-sm">
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Peso</span>
              <span className="text-muted-foreground">{product.weight} g</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Dimensões (L × A × C)</span>
              <span className="text-muted-foreground">
                {product.dimensions.width} × {product.dimensions.height} ×{" "}
                {product.dimensions.length} cm
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Categoria</span>
              <span className="text-muted-foreground">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Avaliações disponíveis após integração com o back-end.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
