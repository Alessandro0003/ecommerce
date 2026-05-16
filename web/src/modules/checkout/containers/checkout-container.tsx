import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/modules/cart";
import type { CartItem } from "@/modules/cart/schemas";
import { CreateAddressContainer } from "@/modules/address";
import type { Address } from "@/modules/address/schemas";
import type { AddressFormValues } from "@/modules/address/components/address-form/schema";
import { ShippingCalculatorContainer } from "@/modules/shipping";
import type { ShippingOption } from "@/modules/shipping/schemas";
import { formatCEP, formatCurrency } from "@/lib/format";
import { CheckoutStepper } from "../components/checkout-stepper";
import { CheckoutSummary } from "../components/checkout-summary";
import { PaymentMethodSelector } from "../components/payment-method-selector";
import type { PaymentMethod } from "../schemas";

type OrderData = {
  items: CartItem[];
  addressId: string;
  shipping: ShippingOption;
  paymentMethod: PaymentMethod;
};

type CheckoutContainerProps = {
  items: CartItem[];
  addresses: Address[];
  onConfirm?: (orderData: OrderData) => Promise<{ orderId: string }>;
};

export function CheckoutContainer({
  items,
  addresses: initialAddresses,
  onConfirm,
}: CheckoutContainerProps) {
  const navigate = useNavigate();
  const { clearSelected } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialAddresses.find((a) => a.isDefault)?.id ?? null
  );
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>();
  const [isCreateAddressOpen, setIsCreateAddressOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) ?? null;

  const isStepValid =
    currentStep === 1
      ? selectedAddressId !== null
      : currentStep === 2
        ? selectedShipping !== null
        : paymentMethod !== undefined;

  function handleNext() {
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
    setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
  }

  function handleBack() {
    setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
  }

  function handleAddressCreate(values: AddressFormValues) {
    const newAddress: Address = { id: `addr-${Date.now()}`, ...values };
    if (newAddress.isDefault) {
      setAddresses((prev) => [
        newAddress,
        ...prev.map((a) => ({ ...a, isDefault: false })),
      ]);
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
    setSelectedAddressId(newAddress.id);
    setIsCreateAddressOpen(false);
    toast.success("Endereço adicionado!");
  }

  async function handleConfirm() {
    if (!selectedAddressId || !selectedShipping || !paymentMethod) return;
    setIsConfirming(true);
    try {
      let orderId: string;
      if (onConfirm) {
        const result = await onConfirm({
          items,
          addressId: selectedAddressId,
          shipping: selectedShipping,
          paymentMethod,
        });
        orderId = result.orderId;
      } else {
        await new Promise((r) => setTimeout(r, 1000));
        orderId = crypto.randomUUID();
      }
      clearSelected();
      navigate(`/pedido/${orderId}/aguardando`);
    } catch {
      toast.error("Erro ao confirmar pedido. Tente novamente.");
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <div>
      {/* Mobile summary toggle */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setIsMobileSummaryOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium"
        >
          <span>
            Ver resumo do pedido ({items.length}{" "}
            {items.length === 1 ? "item" : "itens"})
          </span>
          {isMobileSummaryOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isMobileSummaryOpen && (
          <div className="mt-2">
            <CheckoutSummary items={items} shipping={selectedShipping} />
          </div>
        )}
      </div>

      {/* Stepper */}
      <CheckoutStepper currentStep={currentStep} completedSteps={completedSteps} />

      {/* Content + Summary */}
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Step content */}
        <div className="min-w-0 flex-1">
          {/* ── Step 1: Address ── */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Selecione o endereço de entrega</h2>

              {addresses.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum endereço cadastrado. Adicione um endereço para continuar.
                </p>
              ) : (
                <RadioGroup
                  value={selectedAddressId ?? ""}
                  onValueChange={setSelectedAddressId}
                  className="space-y-3"
                >
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      htmlFor={`addr-${addr.id}`}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                        selectedAddressId === addr.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <RadioGroupItem
                        id={`addr-${addr.id}`}
                        value={addr.id}
                        className="mt-0.5 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">
                            {addr.street}, {addr.number}
                            {addr.complement ? `, ${addr.complement}` : ""}
                          </p>
                          {addr.isDefault && (
                            <Badge className="text-xs">Padrão</Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {addr.neighborhood} — {addr.city}/{addr.state} · CEP{" "}
                          {formatCEP(addr.zipCode)}
                        </p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreateAddressOpen(true)}
              >
                + Adicionar novo endereço
              </Button>
            </div>
          )}

          {/* ── Step 2: Shipping ── */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Calcule o frete</h2>
                {selectedAddress && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Entrega em: {selectedAddress.street}, {selectedAddress.number}{" "}
                    — {selectedAddress.city}/{selectedAddress.state}
                  </p>
                )}
              </div>
              <ShippingCalculatorContainer
                initialZipCode={selectedAddress?.zipCode}
                onSelect={setSelectedShipping}
              />
            </div>
          )}

          {/* ── Step 3: Payment + Review ── */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-3 text-lg font-semibold">Forma de pagamento</h2>
                <PaymentMethodSelector
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </div>

              <Separator />

              {/* Order review */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Revisão do pedido
                </h3>

                {selectedAddress && (
                  <Card>
                    <CardHeader className="pb-1 pt-3">
                      <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Entregar em
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm font-medium">
                        {selectedAddress.street}, {selectedAddress.number}
                        {selectedAddress.complement
                          ? `, ${selectedAddress.complement}`
                          : ""}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAddress.neighborhood} — {selectedAddress.city}/
                        {selectedAddress.state} · CEP{" "}
                        {formatCEP(selectedAddress.zipCode)}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {selectedShipping && (
                  <Card>
                    <CardHeader className="pb-1 pt-3">
                      <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Frete
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm font-medium">
                        {selectedShipping.carrier} — {selectedShipping.service}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedShipping.deadlineDays} dias úteis ·{" "}
                        {formatCurrency(selectedShipping.price)}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Voltar
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={!isStepValid}>
                Próximo
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleConfirm}
                disabled={!isStepValid || isConfirming}
                className="min-w-40"
              >
                {isConfirming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  "Confirmar pedido"
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Desktop summary */}
        <div className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-20">
            <CheckoutSummary items={items} shipping={selectedShipping} />
          </div>
        </div>
      </div>

      <CreateAddressContainer
        open={isCreateAddressOpen}
        onClose={() => setIsCreateAddressOpen(false)}
        onSubmit={handleAddressCreate}
      />
    </div>
  );
}
