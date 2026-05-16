import { Fragment } from "react";
import { Check, CreditCard, MapPin, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckoutStepperProps } from "./types";

const STEPS = [
  { label: "Endereço", Icon: MapPin },
  { label: "Frete", Icon: Truck },
  { label: "Pagamento", Icon: CreditCard },
] as const;

export function CheckoutStepper({ currentStep, completedSteps }: CheckoutStepperProps) {
  return (
    <div className="flex w-full items-start">
      {STEPS.map(({ label, Icon }, index) => {
        const n = (index + 1) as 1 | 2 | 3;
        const done = completedSteps.includes(n);
        const active = currentStep === n;

        return (
          <Fragment key={n}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors",
                  done &&
                    "border-success bg-success text-success-foreground",
                  active &&
                    !done &&
                    "border-primary bg-primary text-primary-foreground",
                  !active &&
                    !done &&
                    "border-muted-foreground/30 bg-muted text-muted-foreground"
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  done && "text-success",
                  active && !done && "text-primary",
                  !active && !done && "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-3 mt-[18px] h-0.5 flex-1 transition-colors",
                  done ? "bg-success" : "bg-border"
                )}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
