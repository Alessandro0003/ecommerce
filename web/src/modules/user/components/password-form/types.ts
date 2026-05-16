import type { PasswordFormValues } from "./schema";

export type PasswordFormProps = {
  onSubmit: (values: PasswordFormValues) => void;
  isSubmitting?: boolean;
};
