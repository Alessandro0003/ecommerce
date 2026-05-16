import { Trash2 } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "../hooks/use-cart";
import { CartItemRow } from "../components/cart-item-row";
import { CartSummary } from "../components/cart-summary";
import { CartEmpty } from "../components/cart-empty";

export function CartContainer() {
  const {
    items,
    selectedItems,
    selectedSubtotal,
    removeItem,
    updateQuantity,
    toggleSelected,
    selectAll,
    unselectAll,
    clearSelected,
  } = useCart();

  if (items.length === 0) return <CartEmpty />;

  const allSelected = items.length > 0 && selectedItems.length === items.length;
  const someSelected = selectedItems.length > 0 && !allSelected;
  const selectAllState: CheckedState = allSelected
    ? true
    : someSelected
      ? "indeterminate"
      : false;

  function handleSelectAll(checked: CheckedState) {
    if (checked === true) selectAll();
    else unselectAll();
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectAllState}
              onCheckedChange={handleSelectAll}
              aria-label="Selecionar todos"
            />
            <span className="text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "itens"} no carrinho
            </span>
          </div>
          {selectedItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={clearSelected}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Remover selecionados
            </Button>
          )}
        </div>

        <div>
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onToggle={toggleSelected}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-72 shrink-0">
        <CartSummary
          selectedCount={selectedItems.length}
          selectedSubtotal={selectedSubtotal}
        />
      </div>
    </div>
  );
}
