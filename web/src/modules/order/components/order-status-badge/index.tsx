import { cn } from "@/lib/utils";
import type { OrderStatusBadgeProps } from "./types";

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pendente",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  PROCESSING: {
    label: "Em processamento",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  PAID: {
    label: "Pago",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  SHIPPED: {
    label: "Enviado",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  DELIVERED: {
    label: "Entregue",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  FAILED: {
    label: "Falhou",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  CANCELLED: {
    label: "Cancelado",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
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
