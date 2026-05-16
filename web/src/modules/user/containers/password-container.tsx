import { toast } from "sonner";
import { PasswordForm } from "../components/password-form";
import type { PasswordFormValues } from "../components/password-form/schema";

type PasswordContainerProps = {
  onSubmit?: (values: PasswordFormValues) => void;
  isSubmitting?: boolean;
};

export function PasswordContainer({ onSubmit, isSubmitting }: PasswordContainerProps) {
  function handleSubmit(values: PasswordFormValues) {
    if (onSubmit) {
      onSubmit(values);
      return;
    }
    console.log("change password:", values);
    toast.success("Senha alterada com sucesso!");
  }

  return <PasswordForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
