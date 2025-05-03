import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../hooks";
import { UserRole } from "../../models";

interface HeaderProps {
  isAuthenticated: boolean;
  onServicesClick: () => void;
  onAboutUsClick: () => void;
}

const Header = ({
  isAuthenticated,
  onServicesClick,
  onAboutUsClick,
}: HeaderProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { role } = user || {};

  const isDashboardView = useMemo(() => {
    return [
      "/profile",
      "/login",
      "/signup",
      "/booking",
      "/dashboard",
      "/admin",
    ].some((path) => pathname.includes(path));
  }, [pathname]);

  const handleLoginClick = () => navigate("/login");

  const commonLinkStyle = "hover:text-blue-600 transition cursor-pointer";

  const renderGuestLinks = () => (
    <>
      <button className={commonLinkStyle} onClick={onAboutUsClick}>
        About us
      </button>
      <button className={commonLinkStyle} onClick={onServicesClick}>
        Services
      </button>
    </>
  );

  const renderAuthLinks = () => (
    <>
      <Link to="/dashboard" className={commonLinkStyle}>
        Dashboard
      </Link>
      {!pathname.includes("booking") && role !== UserRole.Admin && (
        <Link to="/booking" className={commonLinkStyle}>
          Book appointment
        </Link>
      )}
      <Link to="/profile" className={commonLinkStyle}>
        Profile
      </Link>
      <button className={commonLinkStyle} onClick={logout}>
        Logout
      </button>
    </>
  );

  const renderRightNav = () =>
    isAuthenticated ? (
      renderAuthLinks()
    ) : (
      <button className={commonLinkStyle} onClick={handleLoginClick}>
        Login or Sign up
      </button>
    );

  return (
    <header className="bg-gray-100 shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SmileCare
        </Link>

        <nav className="space-x-6 text-gray-800 font-medium">
          {isDashboardView ? (
            <Link to="/" className={commonLinkStyle}>
              Home
            </Link>
          ) : (
            renderGuestLinks()
          )}
          {renderRightNav()}
        </nav>
      </div>
    </header>
  );
};

export default Header;
