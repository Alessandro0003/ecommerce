import { ActivePromotionsCarousel } from "../components/active-promotions-carousel";
import type { Promotion } from "../schemas";

type ActivePromotionsContainerProps = {
  promotions: Promotion[];
};

export function ActivePromotionsContainer({
  promotions,
}: ActivePromotionsContainerProps) {
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
