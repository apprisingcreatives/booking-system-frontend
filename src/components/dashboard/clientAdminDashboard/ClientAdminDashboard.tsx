import { Card, CircularLoading } from '../../common';
import { Settings, UserCog, UserCheck, Stethoscope } from 'lucide-react';
import { useUserFacilities } from '../../../hooks/useUserFacilities';
import { Facility, User } from '../../../models';
import FacilityManagement from './FacilityManagement';
import Header from './Header';

const cardClass = 'p-6 !bg-[#DBDDE1] text-gray-800 rounded-2xl';
const cardDivClass = 'flex items-center justify-between';

const ClientAdminDashboard = ({ currentUser }: { currentUser: User }) => {
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
  const stats = [
    {
      label: 'Facility Users',
      value: users?.length || 0,
      icon: UserCog,
    },
    {
      label: 'Services',
      value: services?.length || 0,
      icon: Settings,
    },
    {
      label: 'Staff',
      value: staff?.length || 0,
      icon: Stethoscope,
    },
    {
      label: 'Patients',
      value: patients?.length || 0,
      icon: UserCheck,
    },
  ];

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-full'>
        <CircularLoading size='md' />
      </div>
    );

  if (error)
    return (
      <div className='text-center text-red-500 mt-10'>
        Failed to load facility data: {error}
      </div>
    );

  return (
    <div className='min-h-full bg-[#fcfcff] px-6 py-10'>
      <div className='max-w-7xl mx-auto'>
        <Header facility={facility as Facility} />

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className={cardClass}>
              <div className={cardDivClass}>
                <div>
                  <p className='text-sm opacity-90'>{label}</p>
                  <h3 className='text-3xl font-bold'>{value}</h3>
                </div>
                <Icon className='w-10 h-10 opacity-80' />
              </div>
            </Card>
          ))}
        </div>

        {/* Facility Management */}
        <FacilityManagement facilityId={`${facilityId}`} />
      </div>
    </div>
  );
};

export default ClientAdminDashboard;
