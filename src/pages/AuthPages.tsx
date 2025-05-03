import { useLocation, Navigate } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import SignUpPage from "../components/auth/SignupPage";
import { useAuth } from "../hooks";
import { UserRole } from "../models";

const AuthPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { role } = user || {};
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  if (isAuthenticated && role !== UserRole.Admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:-mt-16">
      {isLogin ? <LoginPage /> : <SignUpPage />}
    </main>
  );
};

export default AuthPage;
