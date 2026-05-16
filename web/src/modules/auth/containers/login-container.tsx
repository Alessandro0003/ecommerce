import { useAuth } from "@/contexts/auth-context";
import { LoginForm } from "../components/login-form";
import type { LoginFormValues } from "../components/login-form/schema";

type LoginContainerProps = {
  onSubmit?: (values: LoginFormValues) => void;
  isSubmitting?: boolean;
};

export function LoginContainer({ onSubmit, isSubmitting }: LoginContainerProps) {
  const { login, loginAsAdmin } = useAuth();

  function handleSubmit(values: LoginFormValues) {
    if (onSubmit) {
      onSubmit(values);
      return;
    }
    if (values.email.includes("admin")) {
      loginAsAdmin();
    } else {
      login();
    }
  }

  return <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
