import { toast } from "sonner";
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
      toast.success("Bem-vindo, Admin Principal!");
    } else {
      login();
      toast.success("Bem-vindo, João da Silva!");
    }
  }

  return <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
