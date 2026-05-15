import { CreditCard, QrCode, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const paymentMethods = [
  { icon: CreditCard, label: "Cartão" },
  { icon: QrCode, label: "PIX" },
  { icon: FileText, label: "Boleto" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Institucional */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 transition-colors hover:text-primary">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 transition-colors hover:text-primary">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 transition-colors hover:text-primary">
                  Trabalhe conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Atendimento
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 transition-colors hover:text-primary">
                  Central de ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 transition-colors hover:text-primary">
                  Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 transition-colors hover:text-primary">
                  Política de privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Pagamento */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pagamento
            </h3>
            <div className="flex gap-4">
              {paymentMethods.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="rounded-md border p-2 text-muted-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="container py-4 text-center text-sm text-muted-foreground">
        © 2025 PetShop. Todos os direitos reservados.
      </div>
    </footer>
  );
}
