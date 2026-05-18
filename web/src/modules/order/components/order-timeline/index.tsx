import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "../../schemas";

type Stage = {
  label: string;
  description: string;
};

const stages: Stage[] = [
  { label: "Pedido criado", description: "Seu pedido foi recebido" },
  { label: "Pagamento aprovado", description: "Pagamento confirmado" },
  { label: "Em separação", description: "Separando seus produtos" },
  { label: "Enviado", description: "A caminho da entrega" },
  { label: "Entregue", description: "Pedido entregue com sucesso" },
];

// Index of the current/active stage. 5 = all done (DELIVERED).
const statusToStageIndex: Record<OrderStatus, number> = {
  PENDING: 0,
  PROCESSING: 1,
  PAID: 2,
  SHIPPED: 3,
  DELIVERED: 5,
  FAILED: 1,
  CANCELLED: -1,
};

type OrderTimelineProps = {
  status: OrderStatus;
};

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStageIndex = statusToStageIndex[status];
  const isFailed = status === "FAILED";
  const isCancelled = status === "CANCELLED";

  return (
    <div>
      {stages.map((stage, index) => {
        const isDone = index < currentStageIndex;
        const isCurrent = index === currentStageIndex;
        const isLast = index === stages.length - 1;

        let icon: React.ReactNode;
        if (isCancelled) {
          icon = <Circle className="h-5 w-5 text-muted-foreground/40" />;
        } else if (isFailed && isCurrent) {
          icon = <XCircle className="h-5 w-5 text-destructive" />;
        } else if (isDone) {
          icon = (
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          );
        } else if (isCurrent) {
          icon = (
            <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary/20 animate-pulse" />
          );
        } else {
          icon = <Circle className="h-5 w-5 text-muted-foreground/30" />;
        }

        return (
          <div key={stage.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="mt-0.5">{icon}</div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-1 min-h-[2rem]",
                    isDone
                      ? "bg-green-500 dark:bg-green-500"
                      : "bg-border",
                  )}
                />
              )}
            </div>
            <div className={cn("pb-4", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-medium leading-5",
                  isCancelled
                    ? "text-muted-foreground/60"
                    : isFailed && isCurrent
                      ? "text-destructive"
                      : isDone || isCurrent
                        ? "text-foreground"
                        : "text-muted-foreground/50",
                )}
              >
                {stage.label}
              </p>
              <p className="text-xs text-muted-foreground">{stage.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
