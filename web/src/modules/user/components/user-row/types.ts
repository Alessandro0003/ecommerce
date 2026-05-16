import type { User } from "../../schemas";

export type UserRowProps = {
  user: User;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};
