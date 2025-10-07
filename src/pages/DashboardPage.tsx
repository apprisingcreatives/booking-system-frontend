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

  if (role === UserRole.Patient)
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
              Welcome back, {user?.fullName || 'User'}!
            </h1>
            <p className='text-lg text-gray-600'>
              Manage your appointments and stay organized
            </p>
          </div>
          <TabbedDashboard />
        </div>
      </div>
    );

  return <AdminDashboard currentUser={user} />;
};

export default DashboardPage;
