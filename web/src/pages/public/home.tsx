import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockProducts } from "@/mocks";
import { ListProductContainer, ProductFilter } from "@/modules/product";
import type { ProductFilterValues } from "@/modules/product";

const DEFAULT_FILTER: ProductFilterValues = {
  categories: [],
  priceRange: [0, 1000],
};

export default function HomePage() {
  const [filterValues, setFilterValues] =
    useState<ProductFilterValues>(DEFAULT_FILTER);

  const filteredProducts = mockProducts.filter((p) => {
    const inCategory =
      filterValues.categories.length === 0 ||
      filterValues.categories.includes(p.category);
    const effectivePrice = p.promotionalPrice ?? p.price;
    const inPrice = effectivePrice <= filterValues.priceRange[1];
    return inCategory && inPrice;
  });

  return (
    <div className="flex gap-6">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <ProductFilter values={filterValues} onChange={setFilterValues} />
      </aside>

      <div className="min-w-0 flex-1">
        {/* Botão filtros mobile */}
        <div className="mb-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription className="sr-only">
                  Filtre produtos por categoria e faixa de preço
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <ProductFilter
                  values={filterValues}
                  onChange={setFilterValues}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* TODO: <ActivePromotionsContainer /> */}

        <ListProductContainer products={filteredProducts} mode="grid" />
      </div>
    </div>
  );
}
