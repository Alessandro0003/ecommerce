import { ProductForm } from "../components/form";
import type { ProductFormValues } from "../components/form/schema";
import { productToFormValues } from "../components/form/types";
import type { Product } from "../schemas";

type UpdateProductContainerProps = {
  product: Product;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
};

export function UpdateProductContainer({
  product,
  onSubmit,
  isSubmitting,
}: UpdateProductContainerProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Editar Produto</h1>
        <p className="text-sm text-muted-foreground">
          Atualize as informações do produto abaixo.
        </p>
      </div>
      <ProductForm
        defaultValues={productToFormValues(product)}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
