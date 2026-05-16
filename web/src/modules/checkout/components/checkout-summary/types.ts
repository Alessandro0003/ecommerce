import type { CartItem } from "@/modules/cart/schemas";
import type { ShippingOption } from "@/modules/shipping/schemas";

export type CheckoutSummaryProps = {
  items: CartItem[];
  shipping: ShippingOption | null;
};
