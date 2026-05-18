import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PromotionBanner } from "../promotion-banner";
import type { ActivePromotionsCarouselProps } from "./types";

export function ActivePromotionsCarousel({
  promotions,
}: ActivePromotionsCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % promotions.length);
  }, [promotions.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + promotions.length) % promotions.length);
  }, [promotions.length]);

  useEffect(() => {
    if (promotions.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, promotions.length]);

  if (promotions.length === 0) return null;

  if (promotions.length === 1) {
    return <PromotionBanner promotion={promotions[0]} />;
  }

  return (
    <div className="relative">
      <PromotionBanner promotion={promotions[current]} />

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
        onClick={prev}
        aria-label="Promoção anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-10 h-9 w-9 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
        onClick={next}
        aria-label="Próxima promoção"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {promotions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir para promoção ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-4 bg-white" : "w-1.5 bg-white/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
