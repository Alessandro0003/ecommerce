import { useState } from "react";
import { SearchX } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmptyState } from "@/components/layout/empty-state";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { mockProducts } from "@/mocks";
import { UpdateProductContainer } from "@/modules/product";
import type { ProductFormValues } from "@/modules/product/components/form/schema";

export default function AdminProductEditPage() {
  useDocumentTitle("Editar produto — Admin");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = mockProducts.find((p) => p.id === id) ?? null;

  if (!product) {
    return (
      <EmptyState
        icon={SearchX}
        title="Produto não encontrado"
        description="O produto que você está tentando editar não existe."
        actionLabel="Voltar para produtos"
        onAction={() => navigate("/admin/produtos")}
      />
    );
  }

  function handleSubmit(_values: ProductFormValues) {
    setIsSubmitting(true);
    toast.success("Produto atualizado!");
    navigate("/admin/produtos");
    setIsSubmitting(false);
  }

  return (
    <UpdateProductContainer
      product={product}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
