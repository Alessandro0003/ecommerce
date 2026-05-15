import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

type Props = {
  adminOnly?: boolean;
};

export function ProtectedRoute({ adminOnly = false }: Props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
}
