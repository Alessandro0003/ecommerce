import type { ProductCategory } from "../../schemas";

export type ProductFilterValues = {
  categories: ProductCategory[];
  priceRange: [number, number];
};

export type ProductFilterProps = {
  values: ProductFilterValues;
  onChange: (values: ProductFilterValues) => void;
};
