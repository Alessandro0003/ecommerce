import type { User } from "../../schemas";
import type { ProfileFormValues } from "./schema";

export type ProfileFormProps = {
  user: User;
  onSubmit: (values: ProfileFormValues) => void;
  isSubmitting?: boolean;
};
