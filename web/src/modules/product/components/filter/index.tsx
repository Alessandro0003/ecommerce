import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/format";
import type { ProductCategory } from "../../schemas";
import type { ProductFilterProps } from "./types";

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "DOG", label: "Cães" },
  { value: "CAT", label: "Gatos" },
  { value: "BIRD", label: "Aves" },
  { value: "FISH", label: "Peixes" },
  { value: "OTHER", label: "Outros" },
];

const PRICE_MAX = 1000;

export function ProductFilter({ values, onChange }: ProductFilterProps) {
  function handleCategoryChange(category: ProductCategory, checked: boolean) {
    const next = checked
      ? [...values.categories, category]
      : values.categories.filter((c) => c !== category);
    onChange({ ...values, categories: next });
  }

  function handlePriceChange([max]: number[]) {
    onChange({ ...values, priceRange: [0, max ?? PRICE_MAX] });
  }

  return (
    <aside className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 font-semibold">Categorias</h3>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${opt.value}`}
                checked={values.categories.includes(opt.value)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(opt.value, checked === true)
                }
              />
              <Label
                htmlFor={`cat-${opt.value}`}
                className="cursor-pointer text-sm"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Faixa de Preço</h3>
        <Slider
          min={0}
          max={PRICE_MAX}
          step={10}
          value={[values.priceRange[1]]}
          onValueChange={handlePriceChange}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatCurrency(0)}</span>
          <span>até {formatCurrency(values.priceRange[1])}</span>
        </div>
      </div>
    </aside>
  );
}
