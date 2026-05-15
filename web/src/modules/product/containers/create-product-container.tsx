import { ProductForm } from "../components/form";
import type { ProductFormValues } from "../components/form/schema";

type CreateProductContainerProps = {
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
};

export function CreateProductContainer({
  onSubmit,
  isSubmitting,
}: CreateProductContainerProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Criar Produto</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os campos abaixo para cadastrar um novo produto na loja.
        </p>
      </div>
      <ProductForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
