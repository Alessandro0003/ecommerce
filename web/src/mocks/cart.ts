import type { CartItem } from "@/modules/cart";
import { mockProducts } from "./products";

export const mockCartItems: CartItem[] = [
  {
    productId: mockProducts[0].id,
    product: mockProducts[0],
    quantity: 1,
    selected: true,
  },
  {
    productId: mockProducts[2].id,
    product: mockProducts[2],
    quantity: 2,
    selected: true,
  },
  {
    productId: mockProducts[10].id,
    product: mockProducts[10],
    quantity: 3,
    selected: false,
  },
  {
    productId: mockProducts[9].id,
    product: mockProducts[9],
    quantity: 1,
    selected: true,
  },
  {
    productId: mockProducts[11].id,
    product: mockProducts[11],
    quantity: 2,
    selected: false,
  },
];
