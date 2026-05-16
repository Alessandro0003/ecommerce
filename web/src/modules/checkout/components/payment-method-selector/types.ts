import type { PaymentMethod } from "../../schemas";

export type PaymentMethodSelectorProps = {
  value?: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};
