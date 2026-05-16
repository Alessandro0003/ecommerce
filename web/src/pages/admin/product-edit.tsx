import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/mocks";
import { UpdateProductContainer } from "@/modules/product";
import type { ProductFormValues } from "@/modules/product/components/form/schema";

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = mockProducts.find((p) => p.id === id) ?? null;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O produto que você está tentando editar não existe.
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link to="/admin/produtos">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para produtos
          </Link>
        </Button>
      </div>
    );
  }

  function handleSubmit(values: ProductFormValues) {
    setIsSubmitting(true);
    console.log("update product:", product?.id, values);
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
