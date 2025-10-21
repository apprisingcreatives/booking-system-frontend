import { AdminDashboard } from '../components';
import { useAuth } from '../hooks';
import { UserRole } from '../models';
import { Navigate } from 'react-router-dom';
import AppointmentsPage from './AppointmentsPage';

const DashboardPage = () => {
  const { user } = useAuth();
  const { role } = user || {};

  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (
    role === UserRole.Chiropractor ||
    role === UserRole.Patient ||
    role === UserRole.ClientUser
  ) {
    return <AppointmentsPage />;
  }

  return <AdminDashboard currentUser={user} />;
};

export default DashboardPage;
