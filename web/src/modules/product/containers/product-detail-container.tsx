import { ProductDetails } from "../components/details";
import type { Product } from "../schemas";

type ProductDetailContainerProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export function ProductDetailContainer({
  product,
  onAddToCart,
}: ProductDetailContainerProps) {
  return <ProductDetails product={product} onAddToCart={onAddToCart} />;
}
