import { useEffect, useRef, useState } from "react";
import { mockShippingOptions } from "@/mocks";
import { ShippingCalculator } from "../components/shipping-calculator";
import type { ShippingOption } from "../schemas";

type ShippingCalculatorContainerProps = {
  onCalculate?: (zipCode: string) => Promise<ShippingOption[]>;
  onSelect?: (option: ShippingOption) => void;
  initialZipCode?: string;
};

export function ShippingCalculatorContainer({
  onCalculate,
  onSelect,
  initialZipCode,
}: ShippingCalculatorContainerProps) {
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | undefined>();
  const didAutoCalc = useRef(false);

  async function handleCalculate(zipCode: string) {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = onCalculate
        ? await onCalculate(zipCode)
        : await new Promise<ShippingOption[]>((resolve) =>
            setTimeout(() => resolve(mockShippingOptions), 1500)
          );
      setOptions(result);
      setSelectedOption(undefined);
    } catch {
      setIsError(true);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!didAutoCalc.current && initialZipCode) {
      const digits = initialZipCode.replace(/\D/g, "");
      if (digits.length === 8) {
        didAutoCalc.current = true;
        void handleCalculate(digits);
      }
    }
  }, []); // intentional: trigger only on mount when initialZipCode is known

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
      initialZipCode={initialZipCode}
    />
  );
}
