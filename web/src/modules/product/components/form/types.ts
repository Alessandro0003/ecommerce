import type { Product } from "../../schemas";
import type { ProductFormValues } from "./schema";

export type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
};

export function productToFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    promotionalPrice: product.promotionalPrice,
    stock: product.stock,
    weight: product.weight,
    dimensionWidth: product.dimensions.width,
    dimensionHeight: product.dimensions.height,
    dimensionLength: product.dimensions.length,
    imagesText: product.images.join("\n"),
    active: product.active,
  };
}
