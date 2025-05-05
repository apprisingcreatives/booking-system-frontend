import { AdminDashboard, Dashboard } from "../components";
import { useAuth } from "../hooks";
import { UserRole } from "../models";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();
  const { role } = user || {};

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role === UserRole.Admin) {
    return <AdminDashboard />;
  }

  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
