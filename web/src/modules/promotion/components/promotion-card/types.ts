import type { Promotion } from "../../schemas";

export type PromotionCardProps = {
  promotion: Promotion;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};
