import { AdminDashboard } from '../components';
import TabbedDashboard from '../components/dashboard/TabbedDashboard';
import { useAuth } from '../hooks';
import { UserRole } from '../models';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const { role } = user || {};

  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (role === UserRole.Admin) {
    return <AdminDashboard />;
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8'>
      <TabbedDashboard />
    </div>
  );
};

export default DashboardPage;
