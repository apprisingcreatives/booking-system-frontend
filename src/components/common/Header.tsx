import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuth } from '../../hooks';
import { UserRole } from '../../models';
import { CloseIcon, MenuIcon } from './icons';
import { useUserFacilities } from '../../hooks/useUserFacilities';
import Button from './Button';

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
  const { currentFacility } = useUserFacilities();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDashboardView = useMemo(() => {
    return [
      '/profile',
      '/login',
      '/signup',
      '/booking',
      '/dashboard',
      '/admin',
      '/facilities',
      '/appointments',
    ].some((path) => pathname.includes(path));
  }, [pathname]);

  const handleLoginClick = () => navigate('/login');
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <header className='bg-white shadow-md sticky top-0 z-50 border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200'
          >
            <span className='hidden sm:inline'>
              {currentFacility?.name || 'Apprising Creations'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-1'>
            {/* Left Links */}
            {user && isDashboardView ? (
              <Link
                to='/'
                className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
              >
                Home
              </Link>
            ) : (
              <>
                <button
                  onClick={onAboutUsClick}
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  About Us
                </button>
                <button
                  onClick={onServicesClick}
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Services
                </button>
              </>
            )}

            {/* Divider */}
            <div className='w-px h-6 bg-gray-300 mx-2' />

            {/* Right Links */}
            {isAuthenticated ? (
              <>
                <Link
                  to='/dashboard'
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Dashboard
                </Link>
                {role === UserRole.Patient && !pathname.includes('booking') && (
                  <Link
                    to='/booking'
                    className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                  >
                    Book Appointment
                  </Link>
                )}
                <Link
                  to='/profile/update-profile'
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Profile
                </Link>
                <Button variant='danger' onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLoginClick}
                className='ml-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md'
              >
                Login / Sign Up
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200'
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-gray-200 bg-white shadow-lg'>
          <nav className='px-4 py-4 space-y-1'>
            {/* Navigation Links */}
            {isDashboardView ? (
              <Link
                to='/'
                onClick={closeMobileMenu}
                className='block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
              >
                Home
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    onAboutUsClick();
                    closeMobileMenu();
                  }}
                  className='w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    onServicesClick();
                    closeMobileMenu();
                  }}
                  className='w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Services
                </button>
              </>
            )}

            {/* Divider */}
            <div className='h-px bg-gray-200 my-2' />

            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                <Link
                  to='/dashboard'
                  onClick={closeMobileMenu}
                  className='block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Dashboard
                </Link>
                {role === UserRole.Patient && !pathname.includes('booking') && (
                  <Link
                    to='/booking'
                    onClick={closeMobileMenu}
                    className='block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                  >
                    Book Appointment
                  </Link>
                )}
                <Link
                  to='/profile/update-profile'
                  onClick={closeMobileMenu}
                  className='block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className='w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium'
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLoginClick();
                  closeMobileMenu();
                }}
                className='w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-sm text-center'
              >
                Login / Sign Up
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
