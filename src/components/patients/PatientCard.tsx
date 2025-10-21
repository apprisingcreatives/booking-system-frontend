import { User, UserStatus } from '../../models/user';
import { format } from 'date-fns';

interface PatientCardProps {
  patient: User & {
    appointmentCount?: number;
    lastAppointment?: {
      date: Date | string;
      status: string;
    } | null;
  };
  onClick: () => void;
}

const PatientCard = ({ patient, onClick }: PatientCardProps) => {
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return 'bg-green-100 text-green-800';
      case UserStatus.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case UserStatus.Inactive:
        return 'bg-gray-100 text-gray-800';
      case UserStatus.Suspended:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMM d, yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div
      onClick={onClick}
      className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer'
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-lg font-semibold'>
              {patient.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>
              {patient.fullName}
            </h3>
            <p className='text-sm text-gray-500'>{patient.email}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            patient.status
          )}`}
        >
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </span>
      </div>

      {/* Contact Info */}
      {patient.phone && (
        <div className='mb-4'>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>Phone:</span> {patient.phone}
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className='border-t border-gray-200 pt-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-xs text-gray-500 mb-1'>Total Appointments</p>
            <p className='text-2xl font-bold text-gray-900'>
              {patient.appointmentCount || 0}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-500 mb-1'>Last Visit</p>
            <p className='text-sm font-medium text-gray-900'>
              {patient.lastAppointment
                ? formatDate(patient.lastAppointment.date)
                : 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Last Appointment Status */}
      {patient.lastAppointment && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-gray-500'>Last Appointment</span>
            <span className='text-xs font-medium text-gray-700 capitalize'>
              {patient.lastAppointment.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      )}

      {/* Member Since */}
      <div className='mt-3'>
        <p className='text-xs text-gray-500'>
          Patient since {formatDate(patient.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default PatientCard;
