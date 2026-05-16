import { useState } from "react";
import { Truck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/format";
import { ShippingCalculatorContainer } from "@/modules/shipping";
import type { ShippingOption } from "@/modules/shipping";

type CartSummaryProps = {
  selectedCount: number;
  selectedSubtotal: number;
};

export function CartSummary({ selectedCount, selectedSubtotal }: CartSummaryProps) {
  const navigate = useNavigate();
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [shipping, setShipping] = useState<ShippingOption | null>(null);

  const total = selectedSubtotal + (shipping?.price ?? 0);

  function handleShippingSelect(option: ShippingOption) {
    setShipping(option);
    setIsShippingOpen(false);
  }

  return (
    <>
      <Card className="sticky top-20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Resumo do pedido</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 pb-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Itens selecionados</span>
            <span>{selectedCount}</span>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatCurrency(selectedSubtotal)}</span>
          </div>

          <Separator />

          {/* Frete */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Truck className="h-3.5 w-3.5" />
              Frete
            </span>
            {shipping ? (
              <div className="flex items-center gap-1.5">
                <span className="text-right text-xs text-muted-foreground">
                  {shipping.carrier} {shipping.service}
                </span>
                <span className="font-medium">{formatCurrency(shipping.price)}</span>
                <button
                  onClick={() => setShipping(null)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Remover frete"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsShippingOpen(true)}
                className="text-xs text-primary underline-offset-2 hover:underline"
              >
                Calcular frete
              </button>
            )}
          </div>

          <Separator />

          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            disabled={selectedCount === 0}
            onClick={() => navigate("/checkout")}
          >
            Finalizar pedido
          </Button>
        </CardFooter>
      </Card>

      <Sheet open={isShippingOpen} onOpenChange={setIsShippingOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Calcular frete</SheetTitle>
            <SheetDescription>
              Digite o CEP de entrega para ver as opções disponíveis.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ShippingCalculatorContainer onSelect={handleShippingSelect} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
