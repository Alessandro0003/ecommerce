import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDocumentTitle } from "@/hooks/use-document-title";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/mocks";
import { ListProductContainer } from "@/modules/product";
import type { Product } from "@/modules/product";

export default function AdminProductsListPage() {
  useDocumentTitle("Produtos — Admin");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleDeleteRequest(id: string) {
    const product = mockProducts.find((p) => p.id === id) ?? null;
    setDeletingProduct(product);
  }

  function handleDeleteConfirm() {
    toast.success(`Produto "${deletingProduct?.name}" removido.`);
    setDeletingProduct(null);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button onClick={() => navigate("/admin/produtos/novo")}>
          <Plus className="mr-2 h-4 w-4" />
          Criar produto
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <ListProductContainer
        products={filteredProducts}
        mode="table"
        onEdit={(id) => navigate(`/admin/produtos/${id}/editar`)}
        onDelete={handleDeleteRequest}
      />

      <AlertDialog
        open={deletingProduct !== null}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto{" "}
              <strong className="text-foreground">{deletingProduct?.name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Excluir produto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
