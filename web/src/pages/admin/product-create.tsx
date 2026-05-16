import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreateProductContainer } from "@/modules/product";
import type { ProductFormValues } from "@/modules/product/components/form/schema";

export default function AdminProductCreatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(values: ProductFormValues) {
    setIsSubmitting(true);
    console.log("create product:", values);
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
