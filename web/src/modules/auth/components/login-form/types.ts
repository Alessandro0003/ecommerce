import type { LoginFormValues } from "./schema";

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  isSubmitting?: boolean;
};
