import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { getAccessToken } from "../services/localStorage";
import { CircularLoading } from "../components/common";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const accessToken = getAccessToken();
  const isAuthenticating = accessToken && !isAuthenticated;

  if (isAuthenticating) {
    return <CircularLoading size="lg" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
