import type { Product } from "../../schemas";

export type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};
