import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductGrid } from "../components/grid";
import { ProductTableRow } from "../components/table-row";
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

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-lg font-medium">Nenhum produto encontrado</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Tente ajustar os filtros ou cadastre um novo produto.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-lg font-medium text-destructive">
        Erro ao carregar produtos
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Tente novamente mais tarde.
      </p>
    </div>
  );
}

export function ListProductContainer({
  products,
  isLoading,
  isError,
  mode = "grid",
  onAddToCart,
  onEdit,
  onDelete,
}: ListProductContainerProps) {
  if (isLoading) return <GridSkeleton />;
  if (isError) return <ErrorState />;
  if (products.length === 0) return <EmptyState />;

  if (mode === "table") {
    return (
      <div className="rounded-md border">
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
