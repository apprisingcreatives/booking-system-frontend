import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useRef, useCallback } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { MainHeader } from '../components/common';
import { useAuth } from '../hooks';
import { getAccessToken } from '../services/localStorage';
import { UserRole } from '../models/user';
import ManageUsersPage from '../pages/ManageUsersPage';
import FacilitiesPage from '../pages/FacilitiesPage';
import FacilityDetailsPage from '../pages/FacilityDetailsPage';
import FacilityOnboardingPage from '../pages/FacilityOnboardingPage';
import InvitationAcceptPage from '../pages/InvitationAcceptPage';
import ServicesManagementPage from '../pages/ServicesManagementPage';
import StaffManagementPage from '../pages/StaffManagementPage';
import { FacilityUserManagement } from '../components';

const Home = lazy(() => import('../components/home/Home'));
const BookingsPage = lazy(() => import('../pages/BookingsPage'));
const Dashboard = lazy(() => import('../pages/DashboardPage'));
const UserProfilePage = lazy(() => import('../pages/UserProfilePage'));
const AuthPage = lazy(() => import('../pages/AuthPages'));
const PatientManagementPage = lazy(
  () => import('../pages/PatientManagementPage')
);

const AppRoutes = () => {
  const { isAuthenticated, getUser } = useAuth();
  const accessToken = getAccessToken();

  const servicesRef = useRef<HTMLElement | null>(null);
  const aboutUsRef = useRef<HTMLElement | null>(null);

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <Router>
      <MainHeader
        isAuthenticated={!!isAuthenticated}
        onAboutUsClick={() => scrollTo(aboutUsRef)}
        onServicesClick={() => scrollTo(servicesRef)}
      />

      <Suspense fallback={<div className='text-center mt-10'>Loading...</div>}>
        <Routes>
          <Route
            path='/'
            element={<Home aboutUsRef={aboutUsRef} servicesRef={servicesRef} />}
          />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/signup' element={<AuthPage />} />
          <Route
            path='/invitation/accept/:token'
            element={<InvitationAcceptPage />}
          />

          {/* Public facility routes */}

          <Route
            path='/facilities/:facilityId'
            element={<FacilityDetailsPage />}
          />

          {/* Facility onboarding for super admin */}
          <Route
            path='/admin/facility-onboarding'
            element={
              <ProtectedRoute requiredRoles={[UserRole.SuperAdmin]}>
                <FacilityOnboardingPage />
              </ProtectedRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path='/booking'
            element={
              <ProtectedRoute
                requiredRoles={[
                  UserRole.Patient,
                  UserRole.ClientUser,
                  UserRole.ClientAdmin,
                ]}
              >
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/:view'
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/manage-users'
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.SuperAdmin, UserRole.ClientAdmin]}
              >
                <ManageUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/manage-facilities'
            element={
              <ProtectedRoute requiredRoles={[UserRole.SuperAdmin]}>
                <FacilitiesPage />
              </ProtectedRoute>
            }
          />

          {/* Facility management routes */}
          <Route
            path='/facilities/:facilityId/manage-patients'
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.ClientAdmin, UserRole.ClientUser]}
              >
                <PatientManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/facilities/:facilityId/patients/:patientId'
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.ClientAdmin, UserRole.ClientUser]}
              >
                <div>Patient Details - Coming Soon</div>
              </ProtectedRoute>
            }
          />
          <Route
            path='/facilities/:facilityId/manage-staff'
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.SuperAdmin, UserRole.ClientAdmin]}
              >
                <StaffManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/facilities/:facilityId/manage-services'
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.SuperAdmin, UserRole.ClientAdmin]}
              >
                <ServicesManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/facilities/:facilityId/manage-users'
            element={
              <ProtectedRoute requiredRoles={[UserRole.ClientAdmin]}>
                <FacilityUserManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
