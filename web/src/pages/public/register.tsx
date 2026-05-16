import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { RegisterContainer } from "@/modules/auth";

export default function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const wasLoggedOut = useRef(user === null);

  useEffect(() => {
    if (!user) return;
    if (wasLoggedOut.current) toast.success("Bem-vindo ao PetShop!");
    navigate("/", { replace: true });
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <RegisterContainer />
    </div>
  );
}
