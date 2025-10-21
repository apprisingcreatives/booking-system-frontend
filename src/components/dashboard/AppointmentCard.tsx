import { formatDateTime } from '../../utils/dateFormatter';
import { useAuth } from '../../hooks';
import { Appointment, User, UserRole } from '../../models';
import Button from '../common/Button';

type Props = {
  onClickCancel: (id: string) => void;
  onClickReschedule: (appointment: Appointment) => void;
  appointment: Appointment;
};

const AppointmentCard = ({
  onClickCancel,
  onClickReschedule,
  appointment,
}: Props) => {
  const { user } = useAuth();

  const { role } = user || {};

  const {
    appointmentDate,
    patient,
    chiropractorId: chiropractorObject,
    _id: id,
  } = appointment || {};

  const { fullName: chiropractor = '' } =
    (chiropractorObject as Partial<User>) || {};

  return (
    <li className='bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
      <div className='p-6'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-3 mb-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm font-semibold'>
                  {role === UserRole.ClientUser ? '👨‍⚕️' : '👤'}
                </span>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {role === UserRole.ClientUser ? '' : 'Dr.'}{' '}
                  {chiropractor || patient?.fullName}
                </h3>
                <p className='text-sm text-gray-500'>
                  {formatDateTime({ date: appointmentDate })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-3 mt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onClickReschedule(appointment)}
            className='flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300'
          >
            <span className='mr-2'>📅</span>
            Reschedule
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onClickCancel(id)}
            className='flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
          >
            <span className='mr-2'>❌</span>
            Cancel
          </Button>
        </div>
      </div>
    </li>
  );
};

export default AppointmentCard;
