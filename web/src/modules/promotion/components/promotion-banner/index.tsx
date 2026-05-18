import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import type { PromotionBannerProps } from "./types";

export function PromotionBanner({ promotion, onCta }: PromotionBannerProps) {
  const discountLabel =
    promotion.discountType === "PERCENT"
      ? `${promotion.discountValue}% OFF`
      : `${formatCurrency(promotion.discountValue)} OFF`;

  return (
    <div
      className="relative h-64 md:h-80 overflow-hidden rounded-xl"
      style={
        promotion.bannerImage
          ? {
              backgroundImage: `url(${promotion.bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "hsl(var(--primary))" }
      }
    >
      <div className="absolute inset-0 bg-black/50" />

      {promotion.discountValue > 0 && (
        <div className="absolute top-4 right-4 z-10 rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground shadow-lg">
          {discountLabel}
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white md:text-3xl leading-tight">
          {promotion.title}
        </h2>
        <p className="mt-2 max-w-md text-sm text-white/80 line-clamp-2 md:text-base">
          {promotion.description}
        </p>
        <Button
          className="mt-4 w-fit bg-white text-gray-900 hover:bg-white/90"
          onClick={onCta}
        >
          Ver oferta
        </Button>
      </div>
    </div>
  );
}
