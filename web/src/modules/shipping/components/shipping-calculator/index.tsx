import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/format";
import type { ShippingOption } from "../../schemas";
import type { ShippingCalculatorProps } from "./types";

function optionKey(o: ShippingOption) {
  return `${o.carrier}-${o.service}`;
}

export function ShippingCalculator({
  onCalculate,
  options,
  isLoading,
  isError,
  selectedOption,
  onSelect,
}: ShippingCalculatorProps) {
  const [zipCode, setZipCode] = useState("");
  const isZipComplete = zipCode.replace(/\D/g, "").length === 8;

  function handleZipChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    const masked =
      digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    setZipCode(masked);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isZipComplete) onCalculate(zipCode.replace(/\D/g, ""));
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="00000-000"
          value={zipCode}
          onChange={handleZipChange}
          maxLength={9}
          className="max-w-[160px]"
          aria-label="CEP"
        />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={!isZipComplete || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Calcular"
          )}
        </Button>
      </form>

      {isError && (
        <p className="text-sm text-destructive">
          Não foi possível calcular o frete. Tente novamente.
        </p>
      )}

      {options.length > 0 && (
        <RadioGroup
          value={selectedOption ? optionKey(selectedOption) : undefined}
          onValueChange={(value) => {
            const found = options.find((o) => optionKey(o) === value);
            if (found) onSelect?.(found);
          }}
          className="space-y-2"
        >
          {options.map((option) => {
            const key = optionKey(option);
            const isChecked = selectedOption
              ? optionKey(selectedOption) === key
              : false;
            return (
              <label
                key={key}
                htmlFor={key}
                className={`flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors hover:bg-muted/50 ${
                  isChecked ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem id={key} value={key} />
                  <div>
                    <p className="text-sm font-medium">
                      {option.carrier} — {option.service}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.deadlineDays} dias úteis
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold">
                  {formatCurrency(option.price)}
                </span>
              </label>
            );
          })}
        </RadioGroup>
      )}

      {selectedOption && (
        <p className="text-xs font-medium text-success">
          ✓ {selectedOption.carrier} {selectedOption.service} selecionado —{" "}
          {formatCurrency(selectedOption.price)}
        </p>
      )}
    </div>
  );
}
