import { QrCode, CreditCard, Receipt } from "lucide-react";
import type { PaymentMethod } from "@/modules/checkout/schemas";

type PaymentMethodIconProps = {
  method: PaymentMethod;
  className?: string;
};

export function PaymentMethodIcon({ method, className }: PaymentMethodIconProps) {
  const icons: Record<PaymentMethod, React.ReactNode> = {
    PIX: <QrCode className={className} />,
    CREDIT_CARD: <CreditCard className={className} />,
    BOLETO: <Receipt className={className} />,
  };

  return <>{icons[method]}</>;
}
