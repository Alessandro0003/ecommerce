import type { RegisterFormValues } from "./schema";

export type RegisterFormProps = {
  onSubmit: (values: RegisterFormValues) => void;
  isSubmitting?: boolean;
};
