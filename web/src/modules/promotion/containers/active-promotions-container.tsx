import { Skeleton } from "@/components/ui/skeleton";
import { ActivePromotionsCarousel } from "../components/active-promotions-carousel";
import type { Promotion } from "../schemas";

type ActivePromotionsContainerProps = {
  promotions: Promotion[];
  isLoading?: boolean;
};

export function ActivePromotionsContainer({
  promotions,
  isLoading,
}: ActivePromotionsContainerProps) {
  if (isLoading) {
    return (
      <div className="mb-6">
        <Skeleton className="h-64 w-full rounded-xl md:h-80" />
      </div>
    );
  }

  const now = new Date().toISOString();
  const active = promotions.filter(
    (p) => p.active && p.startsAt <= now && p.endsAt >= now,
  );

  if (active.length === 0) return null;

  return (
    <div className="mb-6">
      <ActivePromotionsCarousel promotions={active} />
    </div>
  );
}
