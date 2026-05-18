import { ProductDetails } from "../components/details";
import { ProductDetailSkeleton } from "../components/skeletons/product-detail-skeleton";
import type { Product } from "../schemas";

type ProductDetailContainerProps = {
  product?: Product;
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
};

export function ProductDetailContainer({
  product,
  isLoading,
  onAddToCart,
}: ProductDetailContainerProps) {
  if (isLoading) return <ProductDetailSkeleton />;
  if (!product) return null;
  return <ProductDetails product={product} onAddToCart={onAddToCart} />;
}
