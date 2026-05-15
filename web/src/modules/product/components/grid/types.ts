import type { Product } from "../../schemas";

export type ProductGridProps = {
  products: Product[];
  onAddToCart?: (product: Product) => void;
};
