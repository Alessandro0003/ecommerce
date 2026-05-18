import { cn } from "@/lib/utils";

export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Aguardando",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  APPROVED: {
    label: "Aprovado",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  REJECTED: {
    label: "Recusado",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
