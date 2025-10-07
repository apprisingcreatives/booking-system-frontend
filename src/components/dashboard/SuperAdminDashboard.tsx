import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../common';
import { menuLinks } from './constant';
import { Building2, Users, ArrowRight } from 'lucide-react';
import { useUserFacilities } from '../../hooks/useUserFacilities';
import { useGetAllFacilities } from '../../hooks';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { getAllUsers, allUsers, loading, error } = useUserFacilities();
  const { sendRequest: getAllFacilities, facilities } = useGetAllFacilities();

  useEffect(() => {
    getAllFacilities();
    getAllUsers();
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full'></div>
      </div>
    );

  if (error)
    return (
      <div className='text-center text-red-500 mt-10'>
        Failed to load dashboard: {error}
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-6 py-10'>
      <div className='max-w-7xl mx-auto'>
        <header className='mb-10'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Super Admin Dashboard
          </h1>
          <p className='text-lg text-gray-600'>
            Manage all users and facilities across the platform.
          </p>
        </header>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10'>
          <Card className='p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg rounded-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm opacity-90'>Total Facilities</p>
                <h3 className='text-3xl font-bold'>{facilities?.length}</h3>
              </div>
              <Building2 className='w-10 h-10 opacity-80' />
            </div>
          </Card>

          <Card className='p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg rounded-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm opacity-90'>Total Users</p>
                <h3 className='text-3xl font-bold'>{allUsers?.length}</h3>
              </div>
              <Users className='w-10 h-10 opacity-80' />
            </div>
          </Card>
        </div>

        {/* Role Actions */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
          <button
            onClick={() => navigate('/admin/manage-users')}
            className='rounded-xl bg-blue-600 text-white py-3 font-medium hover:bg-blue-700 transition-all shadow-md'
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate('/admin/manage-facilities')}
            className='rounded-xl bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700 transition-all shadow-md'
          >
            Manage Facilities
          </button>
          <button
            onClick={() => navigate('/admin/facility-onboarding')}
            className='rounded-xl bg-purple-600 text-white py-3 font-medium hover:bg-purple-700 transition-all shadow-md'
          >
            Onboard New Facility
          </button>
        </div>

        {/* Menu Links */}
        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Quick Access
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {menuLinks.map((menuLink) => (
              <Card
                key={menuLink.label}
                hover
                className='group rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300'
              >
                <Link to={menuLink.link} className='block p-6'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200'>
                      <Users className='text-white w-6 h-6' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200'>
                        {menuLink.label}
                      </h3>
                      <p className='text-sm text-gray-500 mt-1'>
                        {menuLink.description ||
                          'Manage related resources and data'}
                      </p>
                    </div>
                    <ArrowRight className='w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200' />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
