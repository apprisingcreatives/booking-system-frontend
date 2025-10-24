import React from 'react';
import Button from '../../common/Button';
import {
  canCancel,
  canComplete,
  canReschedule,
} from '../../../utils/permissions';
import { AppointmentStatus, UserRole } from '../../../models';

type Props = {
  appointmentStatus: AppointmentStatus;
  userRole: UserRole;
  onMarkComplete: () => void;
  onReschedule: () => void;
  onCancel: () => void;
  onClose: () => void;
  completeLoading: boolean;
  rescheduleLoading: boolean;
  cancelLoading: boolean;
};

const ActionButtons = ({
  appointmentStatus,
  userRole,
  onMarkComplete,
  onReschedule,
  onCancel,
  onClose,
  completeLoading,
  rescheduleLoading,
  cancelLoading,
}: Props) => {
  return (
    <div className='flex justify-between items-center gap-2 pt-4 border-t'>
      <div className='flex gap-2'>
        {canComplete(appointmentStatus, userRole) && (
          <Button
            onClick={onMarkComplete}
            loading={completeLoading}
            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50'
          >
            Mark Complete
          </Button>
        )}
        {canReschedule(appointmentStatus, userRole) && (
          <Button
            onClick={onReschedule}
            loading={rescheduleLoading}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
          >
            Reschedule
          </Button>
        )}
        {canCancel(appointmentStatus, userRole) && (
          <Button onClick={onCancel} loading={cancelLoading} variant='danger'>
            Cancel
          </Button>
        )}
      </div>
      <button
        onClick={onClose}
        className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
      >
        Close
      </button>
    </div>
  );
};

export default ActionButtons;
