import type { ShippingOption } from "../../schemas";

export type ShippingCalculatorProps = {
  onCalculate: (zipCode: string) => void;
  options: ShippingOption[];
  isLoading?: boolean;
  isError?: boolean;
  selectedOption?: ShippingOption;
  onSelect?: (option: ShippingOption) => void;
};
