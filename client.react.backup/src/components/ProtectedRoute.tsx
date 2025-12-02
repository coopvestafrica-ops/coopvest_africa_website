import { useAuthContext, UserRole } from "@/contexts/AuthContext";
import NotFound from "@/pages/NotFound";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
}

export default function ProtectedRoute({
  children,
  requiredRole = "member",
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated || !user) {
    return <NotFound />;
  }

  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (!requiredRoles.includes(user.role)) {
    return <NotFound />;
  }

  return <>{children}</>;
}
