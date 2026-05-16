import { useAuth } from "@/contexts/auth-context";
import { RegisterForm } from "../components/register-form";
import type { RegisterFormValues } from "../components/register-form/schema";

type RegisterContainerProps = {
  onSubmit?: (values: RegisterFormValues) => void;
  isSubmitting?: boolean;
};

export function RegisterContainer({
  onSubmit,
  isSubmitting,
}: RegisterContainerProps) {
  const { login } = useAuth();

  function handleSubmit(values: RegisterFormValues) {
    if (onSubmit) {
      onSubmit(values);
      return;
    }
    login();
  }

  return <RegisterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
