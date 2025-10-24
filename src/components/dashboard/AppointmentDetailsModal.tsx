import { useState } from 'react';
import {
  Appointment,
  Chiropractor,
  Facility,
  PaymentMethod,
  Service,
  User,
} from '../../models';
import { Modal } from '../common';
import { format } from 'date-fns';
import { getAppointmentStatusColor, getPaymentStatusColor } from './helpers';
import RescheduleModal from './RescheduleModal';
import {
  useCancelAppointment,
  useRescheduleAppointment,
  useCompleteAppointment,
  useSnackbar,
  useAuth,
  useGetChiropractorAppointments,
} from '../../hooks';
import { SnackbarType } from '../../constants/snackbar';
import { UserRole } from '../../models';

import ChiropractorInfoSection from './appointmentDetails/ChiropractorInfoSection';
import PatientInfoSection from './appointmentDetails/PatientInfoSection';
import PaymentInfoSection from './appointmentDetails/PaymentInfoSection';
import ServiceInfoSection from './appointmentDetails/ServiceInfoSection';
import FacilitiInfoSection from './appointmentDetails/FacilitiInfoSection';
import ActionButtons from './appointmentDetails/ActionButtons';
import Button from '../common/Button';

interface AppointmentDetailsModalProps {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
  onUpdate?: () => void;
}

const AppointmentDetailsModal = ({
  open,
  appointment,
  onClose,
  onUpdate,
}: AppointmentDetailsModalProps) => {
  const { user } = useAuth();
  const { snackbar } = useSnackbar();
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);

  const { sendRequest: cancelAppointment, loading: cancelLoading } =
    useCancelAppointment();
  const { sendRequest: rescheduleAppointment, loading: rescheduleLoading } =
    useRescheduleAppointment();
  const { sendRequest: completeAppointment, loading: completeLoading } =
    useCompleteAppointment();
  const {
    sendRequest: fetchChiropractorAppointments,
    appointments,
    loading: fetchChiropractorAppointmentsLoading,
  } = useGetChiropractorAppointments();

  const chiropractor = appointment?.chiropractorId as Chiropractor;
  const service = appointment?.serviceId as Service;
  const facility = appointment?.facilityId as Facility;
  const patient = appointment?.patientId as User;

  if (!appointment) return null;

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleCancelAppointment = () => {
    if (!appointment) return;

    cancelAppointment(
      appointment._id,
      () => {
        snackbar(
          'Appointment cancelled successfully',
          SnackbarType.SUCCESS,
          true,
          3000
        );
        setConfirmCancelOpen(false);
        onClose();
        onUpdate?.();
      },
      (error) => {
        snackbar(error, SnackbarType.ERROR, true, 5000);
      }
    );
  };

  const handleRescheduleAppointment = (newDateTime: string) => {
    if (!appointment) return;

    rescheduleAppointment(
      appointment._id,
      newDateTime,
      () => {
        snackbar(
          'Appointment rescheduled successfully',
          SnackbarType.SUCCESS,
          true,
          3000
        );
        setRescheduleModalOpen(false);
        onClose();
        onUpdate?.();
      },
      (error) => {
        snackbar(error, SnackbarType.ERROR, true, 5000);
      }
    );
  };

  const handleCompleteAppointment = () => {
    if (!appointment) return;

    completeAppointment(
      appointment._id,
      () => {
        snackbar(
          'Appointment marked as completed',
          SnackbarType.SUCCESS,
          true,
          3000
        );
        setConfirmCompleteOpen(false);
        onClose();
        onUpdate?.();
      },
      (error) => {
        snackbar(error, SnackbarType.ERROR, true, 5000);
      }
    );
  };

  const handleOpenReschedule = async () => {
    if (appointment?.chiropractorId) {
      const chiropractorId =
        typeof appointment.chiropractorId === 'string'
          ? appointment.chiropractorId
          : appointment.chiropractorId._id;
      if (chiropractorId) {
        try {
          // Fetch chiropractor appointments to get booked times
          await fetchChiropractorAppointments(chiropractorId);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    }
    setRescheduleModalOpen(true);
  };

  const handleOpenMarkCompletee = () => {
    setConfirmCompleteOpen(true);
  };

  const handleOpenCancel = () => {
    setConfirmCancelOpen(true);
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title='Appointment Details'
      size='lg'
    >
      <div className='space-y-6'>
        {/* Status Badges */}
        <div className='flex gap-2'>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getAppointmentStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1).replace('_', ' ')}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
              appointment.paymentStatus
            )}`}
          >
            {appointment.paymentStatus.charAt(0).toUpperCase() +
              appointment.paymentStatus.slice(1)}
          </span>
        </div>

        {/* Date & Time */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-semibold text-gray-700 mb-2'>
            Date & Time
          </h3>
          <div className='flex items-center gap-2'>
            <span className='text-2xl'>📅</span>
            <div>
              <p className='text-lg font-medium text-gray-900'>
                {formatDate(appointment.appointmentDate)}
              </p>
              <p className='text-sm text-gray-600'>
                {formatTime(appointment.appointmentTime)}
              </p>
            </div>
          </div>
        </div>

        {patient && <PatientInfoSection patient={patient} />}
        {chiropractor && (
          <ChiropractorInfoSection chiropractor={chiropractor} />
        )}
        {service && <ServiceInfoSection service={service} />}
        {facility && <FacilitiInfoSection facility={facility} />}

        {/* Payment Information */}
        <PaymentInfoSection
          paymentAmount={appointment.paymentAmount}
          paymentMethod={appointment.paymentMethod as PaymentMethod}
        />

        {/* Notes */}
        {appointment.notes && (
          <div>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>Notes</h3>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-700'>{appointment.notes}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}

        <ActionButtons
          appointmentStatus={appointment.status}
          userRole={user?.role as UserRole}
          onMarkComplete={handleOpenMarkCompletee}
          onReschedule={handleOpenReschedule}
          onCancel={handleOpenCancel}
          onClose={onClose}
          completeLoading={completeLoading}
          rescheduleLoading={fetchChiropractorAppointmentsLoading}
          cancelLoading={cancelLoading}
        />
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        onConfirm={handleRescheduleAppointment}
        appointments={appointments || []}
        loading={rescheduleLoading}
      />

      {/* Confirm Cancel Modal */}
      <Modal
        isOpen={confirmCancelOpen}
        onClose={() => setConfirmCancelOpen(false)}
        title='Cancel Appointment'
        size='sm'
      >
        <div className='space-y-4'>
          <p className='text-gray-700'>
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
          </p>
          <div className='flex justify-end gap-2'>
            <Button
              variant='ghost'
              onClick={() => setConfirmCancelOpen(false)}
              disabled={cancelLoading}
            >
              No, Keep It
            </Button>
            <Button
              variant='danger'
              onClick={handleCancelAppointment}
              loading={cancelLoading}
            >
              {cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Complete Modal */}
      <Modal
        isOpen={confirmCompleteOpen}
        onClose={() => setConfirmCompleteOpen(false)}
        title='Complete Appointment'
        size='sm'
      >
        <div className='space-y-4'>
          <p className='text-gray-700'>
            Are you sure you want to mark this appointment as completed?
          </p>
          <div className='flex justify-end gap-2'>
            <Button
              variant='ghost'
              onClick={() => setConfirmCompleteOpen(false)}
              disabled={completeLoading}
            >
              No
            </Button>
            <Button
              onClick={handleCompleteAppointment}
              disabled={completeLoading}
              className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50'
            >
              {completeLoading ? 'Completing...' : 'Yes, Complete'}
            </Button>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default AppointmentDetailsModal;
