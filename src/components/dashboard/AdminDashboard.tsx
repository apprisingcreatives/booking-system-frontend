import { User, UserRole } from '../../models';
import SuperAdminDashboard from './SuperAdminDashboard';
import ClientAdminDashboard from './clientAdminDashboard/ClientAdminDashboard';

const AdminDashboard = ({ currentUser }: { currentUser: User }) => {
  if (!currentUser) return null;

  switch (currentUser.role) {
    case UserRole.SuperAdmin:
      return <SuperAdminDashboard />;
    case UserRole.ClientAdmin:
      return <ClientAdminDashboard currentUser={currentUser} />;
    default:
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 text-gray-700'>
          <p>You don’t have access to the admin dashboard.</p>
        </div>
      );
  }
};

export default AdminDashboard;
