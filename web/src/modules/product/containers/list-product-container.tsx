import { Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/layout/empty-state";
import { ErrorState } from "@/components/layout/error-state";
import { ProductGrid } from "../components/grid";
import { ProductTableRow } from "../components/table-row";
import { ProductGridSkeleton } from "../components/skeletons/product-grid-skeleton";
import { ProductTableSkeleton } from "../components/skeletons/product-table-skeleton";
import type { Product } from "../schemas";

type ListProductContainerProps = {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  mode?: "grid" | "table";
  onAddToCart?: (product: Product) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ListProductContainer({
  products,
  isLoading,
  isError,
  mode = "grid",
  onAddToCart,
  onEdit,
  onDelete,
}: ListProductContainerProps) {
  if (isLoading)
    return mode === "table" ? (
      <ProductTableSkeleton />
    ) : (
      <ProductGridSkeleton />
    );

  if (isError)
    return <ErrorState message="Não foi possível carregar os produtos." />;

  if (products.length === 0)
    return (
      <EmptyState
        icon={Package}
        title="Nenhum produto encontrado"
        description="Tente ajustar os filtros ou cadastre um novo produto."
      />
    );

  if (mode === "table") {
    return (
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return <ProductGrid products={products} onAddToCart={onAddToCart} />;
}
