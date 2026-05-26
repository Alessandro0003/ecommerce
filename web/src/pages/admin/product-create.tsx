import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreateProductContainer } from "@/modules/product";
import { useDocumentTitle } from "@/hooks/use-document-title";
import type { ProductFormValues } from "@/modules/product/components/form/schema";

export default function AdminProductCreatePage() {
  useDocumentTitle("Novo produto — Admin");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(_values: ProductFormValues) {
    setIsSubmitting(true);
    toast.success("Produto criado!");
    navigate("/admin/produtos");
    setIsSubmitting(false);
  }

  return (
    <CreateProductContainer
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
