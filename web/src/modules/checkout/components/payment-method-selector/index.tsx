import { useState } from "react";
import { CreditCard, QrCode, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentMethod } from "../../schemas";
import type { PaymentMethodSelectorProps } from "./types";

const OPTIONS: { value: PaymentMethod; label: string; Icon: React.FC<{ className?: string }> }[] =
  [
    { value: "PIX", label: "PIX", Icon: QrCode },
    { value: "CREDIT_CARD", label: "Cartão de crédito", Icon: CreditCard },
    { value: "BOLETO", label: "Boleto bancário", Icon: FileText },
  ];

function maskCardNumber(val: string) {
  const d = val.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}

function maskExpiry(val: string) {
  const d = val.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="space-y-3">
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as PaymentMethod)}
        className="space-y-2"
      >
        {OPTIONS.map(({ value: optVal, label, Icon }) => {
          const checked = value === optVal;
          return (
            <div key={optVal}>
              <label
                htmlFor={optVal}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                  checked ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem id={optVal} value={optVal} />
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{label}</span>
              </label>

              {/* PIX content */}
              {checked && optVal === "PIX" && (
                <div className="mt-2 flex flex-col items-center gap-3 rounded-b-lg border-x border-b px-4 py-5">
                  <div className="flex h-36 w-36 items-center justify-center rounded-lg border bg-muted">
                    <p className="px-2 text-center text-xs text-muted-foreground">
                      QR Code gerado após confirmação
                    </p>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    O QR code PIX será gerado após a confirmação do pedido.
                  </p>
                </div>
              )}

              {/* Credit card content */}
              {checked && optVal === "CREDIT_CARD" && (
                <div className="mt-2 space-y-3 rounded-b-lg border-x border-b px-4 py-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Número do cartão</Label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      maxLength={19}
                      onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nome no cartão</Label>
                    <Input
                      placeholder="NOME SOBRENOME"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Validade</Label>
                      <Input
                        placeholder="MM/AA"
                        value={expiry}
                        maxLength={5}
                        onChange={(e) => setExpiry(maskExpiry(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">CVV</Label>
                      <Input
                        placeholder="123"
                        type="password"
                        value={cvv}
                        maxLength={4}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Boleto content */}
              {checked && optVal === "BOLETO" && (
                <div className="mt-2 space-y-2 rounded-b-lg border-x border-b px-4 py-4">
                  <div className="rounded-lg border bg-muted px-4 py-5 text-center">
                    <p className="text-xs text-muted-foreground">
                      Código de barras gerado após confirmação
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vencimento em 3 dias úteis após a confirmação do pedido.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
