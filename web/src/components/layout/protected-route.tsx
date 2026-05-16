import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

type Props = {
  adminOnly?: boolean;
};

export function ProtectedRoute({ adminOnly = false }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (adminOnly && user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
}
