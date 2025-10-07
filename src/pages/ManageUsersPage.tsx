import { Navigate } from 'react-router-dom';
import { ManageUsers } from '../components';
import { useAuth } from '../hooks';
import { UserRole } from '../models';

const ManageUsersPage = () => {
  const { user } = useAuth();

  if (user?.role !== UserRole.SuperAdmin) {
    return <Navigate to='/dashboard' replace />;
  }

  return <ManageUsers />;
};

export default ManageUsersPage;
