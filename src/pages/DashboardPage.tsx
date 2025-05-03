import { AdminDashboard, Dashboard } from "../components";
import { useAuth } from "../hooks";
import { UserRole } from "../models";

const DashboardPage = () => {
  const { user } = useAuth();
  const { role } = user || {};

  if (role === UserRole.Admin) {
    return <AdminDashboard />;
  }

  return <Dashboard />;
};

export default DashboardPage;
