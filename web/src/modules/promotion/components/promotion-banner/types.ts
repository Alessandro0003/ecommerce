import type { Promotion } from "../../schemas";

export type PromotionBannerProps = {
  promotion: Promotion;
  onCta?: () => void;
};
