import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { getAccessToken } from '../services/localStorage';
import { LoadingSpinner } from '../components/common';
import { UserRole } from '../models/user';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  requireFacilityAccess?: boolean;
  facilityId?: string;
}

const ProtectedRoute = ({
  children,
  requiredRoles,
  requireFacilityAccess = false,
  facilityId,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const accessToken = getAccessToken();
  const isAuthenticating = accessToken && !isAuthenticated;

  if (isAuthenticating) {
    return <LoadingSpinner size='lg' text='Authenticating...' />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Check role-based access
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to='/dashboard' replace />;
  }

  // Check facility access
  if (requireFacilityAccess && facilityId) {
    if (user.role !== UserRole.SuperAdmin && user.facilityId !== facilityId) {
      return <Navigate to='/dashboard' replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
