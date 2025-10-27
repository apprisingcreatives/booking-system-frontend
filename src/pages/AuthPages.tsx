import { Navigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';

import { useAuth } from '../hooks';
import { UserRole } from '../models';

const AuthPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { role } = user || {};

  if (isAuthenticated && role !== UserRole.Patient) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100 px-4 md:-mt-16'>
      <LoginPage />
    </main>
  );
};

export default AuthPage;
