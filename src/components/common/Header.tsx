import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../../hooks";
import { UserRole } from "../../models";
import { CloseIcon, MenuIcon } from "./icons";

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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const handleAboutUsClick = () => {
    onAboutUsClick();
    toggleMobileMenu();
  };

  const handleServicesClick = () => {
    onServicesClick();
    toggleMobileMenu();
  };
  const commonLinkStyle =
    "hover:text-blue-600 text-gray-800 transition cursor-pointer";

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
    <div className="flex md:flex-row flex-col items-end gap-x-6">
      <Link to="/dashboard" className={commonLinkStyle}>
        Dashboard
      </Link>
      {!pathname.includes("booking") && role === UserRole.Patient && (
        <Link to="/booking" className={commonLinkStyle}>
          Book appointment
        </Link>
      )}
      <Link to="/profile/update-profile" className={commonLinkStyle}>
        Profile
      </Link>
      <button className={commonLinkStyle} onClick={logout}>
        Logout
      </button>
    </div>
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
    <header className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SmileCare
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-6 font-medium">
          {isDashboardView ? (
            <Link to="/" className={commonLinkStyle}>
              Home
            </Link>
          ) : (
            renderGuestLinks()
          )}
          {renderRightNav()}
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 font-medium text-right">
          {isDashboardView ? (
            <Link to="/" className={commonLinkStyle} onClick={toggleMobileMenu}>
              Home
            </Link>
          ) : (
            <div className="flex md:flex-row flex-col justify-center items-end">
              <button className={commonLinkStyle} onClick={handleAboutUsClick}>
                About us
              </button>
              <button className={commonLinkStyle} onClick={handleServicesClick}>
                Services
              </button>
            </div>
          )}
          <div className="flex flex-col space-y-2">{renderRightNav()}</div>
        </div>
      )}
    </header>
  );
};

export default Header;
