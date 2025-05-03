import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useCallback } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { MainHeader } from "../components/common";
import { useAuth } from "../hooks";
import { getAccessToken } from "../services/localStorage";
import ManageUsersPage from "../pages/ManageUsersPage";

const Home = lazy(() => import("../components/home/Home"));
const BookingsPage = lazy(() => import("../pages/BookingsPage"));
const Dashboard = lazy(() => import("../pages/DashboardPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const AuthPage = lazy(() => import("../pages/AuthPages"));

const AppRoutes = () => {
  const { isAuthenticated, getUser } = useAuth();
  const accessToken = getAccessToken();

  const servicesRef = useRef<HTMLElement | null>(null);
  const aboutUsRef = useRef<HTMLElement | null>(null);

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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

      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Home aboutUsRef={aboutUsRef} servicesRef={servicesRef} />}
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute>
                <ManageUsersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
