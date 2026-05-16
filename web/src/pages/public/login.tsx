import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { LoginContainer } from "@/modules/auth";

type LocationState = { from?: { pathname: string } };

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname ?? "/";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <LoginContainer />
    </div>
  );
}
