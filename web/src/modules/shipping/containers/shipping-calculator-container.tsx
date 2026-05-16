import { useState } from "react";
import { mockShippingOptions } from "@/mocks";
import { ShippingCalculator } from "../components/shipping-calculator";
import type { ShippingOption } from "../schemas";

type ShippingCalculatorContainerProps = {
  onCalculate?: (zipCode: string) => Promise<ShippingOption[]>;
  onSelect?: (option: ShippingOption) => void;
};

export function ShippingCalculatorContainer({
  onCalculate,
  onSelect,
}: ShippingCalculatorContainerProps) {
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | undefined>();

  async function handleCalculate(zipCode: string) {
    setIsLoading(true);
    setIsError(false);
    try {
      let result: ShippingOption[];
      if (onCalculate) {
        result = await onCalculate(zipCode);
      } else {
        result = await new Promise<ShippingOption[]>((resolve) =>
          setTimeout(() => resolve(mockShippingOptions), 1500)
        );
      }
      setOptions(result);
      setSelectedOption(undefined);
    } catch {
      setIsError(true);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelect(option: ShippingOption) {
    setSelectedOption(option);
    onSelect?.(option);
  }

  return (
    <ShippingCalculator
      onCalculate={handleCalculate}
      options={options}
      isLoading={isLoading}
      isError={isError}
      selectedOption={selectedOption}
      onSelect={handleSelect}
    />
  );
}
