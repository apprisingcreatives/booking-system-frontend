import { useNavigate } from 'react-router-dom';
import { Card } from '../common';
import {
  Settings,
  UserCog,
  UserCheck,
  Building2,
  Stethoscope,
} from 'lucide-react';
import { useUserFacilities } from '../../hooks/useUserFacilities';
import { User } from '../../models';

const ClientAdminDashboard = ({ currentUser }: { currentUser: User }) => {
  const navigate = useNavigate();
  const {
    currentFacility: facility,
    users,
    services,
    chiropractors: staff,
    patients,
    loading,
    error,
  } = useUserFacilities();
  const { facilityId } = currentUser;

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full'></div>
      </div>
    );

  if (error)
    return (
      <div className='text-center text-red-500 mt-10'>
        Failed to load facility data: {error}
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-6 py-10'>
      <div className='max-w-7xl mx-auto'>
        <header className='mb-10'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            {facility?.name || 'Facility'} Admin Dashboard
          </h1>
          <p className='text-lg text-gray-600'>
            Manage operations and users within your facility.
          </p>

          {facility && (
            <div className='mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200'>
              <div className='flex items-center space-x-4'>
                <Building2 className='w-6 h-6 text-blue-600' />
                <div>
                  <h3 className='font-semibold text-blue-900'>
                    {facility.name}
                  </h3>
                  <p className='text-sm text-blue-700'>{facility.address}</p>
                  <p className='text-sm text-blue-600'>
                    {facility.email} • {facility.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <Card className='p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg rounded-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm opacity-90'>Facility Users</p>
                <h3 className='text-3xl font-bold'>{users?.length}</h3>
              </div>
              <UserCog className='w-10 h-10 opacity-80' />
            </div>
          </Card>

          <Card className='p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg rounded-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm opacity-90'>Services</p>
                <h3 className='text-3xl font-bold'>{services?.length}</h3>
              </div>
              <Settings className='w-10 h-10 opacity-80' />
            </div>
          </Card>

          <Card className='p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg rounded-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm opacity-90'>Staff</p>
                <h3 className='text-3xl font-bold'>{staff?.length}</h3>
              </div>
              <Stethoscope className='w-10 h-10 opacity-80' />
            </div>
          </Card>

          <Card className='p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg rounded-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm opacity-90'>Patients</p>
                <h3 className='text-3xl font-bold'>{patients?.length}</h3>
              </div>
              <UserCheck className='w-10 h-10 opacity-80' />
            </div>
          </Card>
        </div>

        {/* Facility Management */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
          <button
            onClick={() =>
              navigate(`/facilities/${facilityId}/manage-services`)
            }
            className='rounded-xl bg-blue-600 text-white py-4 font-medium hover:bg-blue-700 transition-all shadow-md flex items-center justify-center space-x-2'
          >
            <Settings className='w-5 h-5' />
            <span>Manage Services</span>
          </button>
          <button
            onClick={() => navigate(`/facilities/${facilityId}/manage-staff`)}
            className='rounded-xl bg-green-600 text-white py-4 font-medium hover:bg-green-700 transition-all shadow-md flex items-center justify-center space-x-2'
          >
            <UserCog className='w-5 h-5' />
            <span>Manage Staff</span>
          </button>
          <button
            onClick={() =>
              navigate(`/facilities/${facilityId}/manage-patients`)
            }
            className='rounded-xl bg-purple-600 text-white py-4 font-medium hover:bg-purple-700 transition-all shadow-md flex items-center justify-center space-x-2'
          >
            <UserCheck className='w-5 h-5' />
            <span>Manage Patients</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientAdminDashboard;
