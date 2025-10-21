import { Appointment, AppointmentStatus } from '../../models';
import { PaymentStatus } from '../../models/appointments';
import { Modal } from '../common';
import { format } from 'date-fns';

interface AppointmentDetailsModalProps {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

const AppointmentDetailsModal = ({
  open,
  appointment,
  onClose,
}: AppointmentDetailsModalProps) => {
  if (!appointment) return null;

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Confirmed:
        return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.Completed:
        return 'bg-green-100 text-green-800';
      case AppointmentStatus.Cancelled:
        return 'bg-red-100 text-red-800';
      case AppointmentStatus.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case AppointmentStatus.InProgress:
        return 'bg-purple-100 text-purple-800';
      case AppointmentStatus.NoShow:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Paid:
        return 'bg-green-100 text-green-800';
      case PaymentStatus.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case PaymentStatus.Failed:
        return 'bg-red-100 text-red-800';
      case PaymentStatus.Refunded:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  };

  const formatTime = (time: string) => {
    return time;
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
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
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

        {/* Patient Information */}
        {appointment.patient && (
          <div>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>
              Patient Information
            </h3>
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <p className='font-medium text-gray-900'>
                {appointment.patient.fullName}
              </p>
              {appointment.patient.email && (
                <p className='text-sm text-gray-600'>
                  📧 {appointment.patient.email}
                </p>
              )}
              {appointment.patient.phone && (
                <p className='text-sm text-gray-600'>
                  📱 {appointment.patient.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Chiropractor Information */}
        {appointment.chiropractor && (
          <div>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>
              Chiropractor
            </h3>
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <p className='font-medium text-gray-900'>
                {appointment.chiropractor.name}
              </p>
              {appointment.chiropractor.specialization && (
                <p className='text-sm text-gray-600'>
                  {appointment.chiropractor.specialization}
                </p>
              )}
              {appointment.chiropractor.email && (
                <p className='text-sm text-gray-600'>
                  📧 {appointment.chiropractor.email}
                </p>
              )}
              {appointment.chiropractor.phone && (
                <p className='text-sm text-gray-600'>
                  📱 {appointment.chiropractor.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Service Information */}
        {appointment.service && (
          <div>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>
              Service
            </h3>
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <p className='font-medium text-gray-900'>
                {appointment.service.name}
              </p>
              {appointment.service.description && (
                <p className='text-sm text-gray-600 mt-1'>
                  {appointment.service.description}
                </p>
              )}
              <div className='flex gap-4 mt-2'>
                {appointment.service.durationMinutes && (
                  <p className='text-sm text-gray-600'>
                    ⏱️ {appointment.service.durationMinutes} minutes
                  </p>
                )}
                {appointment.service.price && (
                  <p className='text-sm font-semibold text-gray-900'>
                    💰 ₱{appointment.service.price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Facility Information */}
        {appointment.facility && (
          <div>
            <h3 className='text-sm font-semibold text-gray-700 mb-2'>
              Facility
            </h3>
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <p className='font-medium text-gray-900'>
                {appointment.facility.name}
              </p>
              {appointment.facility.address && (
                <p className='text-sm text-gray-600'>
                  📍 {appointment.facility.address}
                </p>
              )}
              {appointment.facility.phoneNumber && (
                <p className='text-sm text-gray-600'>
                  📱 {appointment.facility.phoneNumber}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div>
          <h3 className='text-sm font-semibold text-gray-700 mb-2'>
            Payment Details
          </h3>
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Amount:</span>
              <span className='text-xl font-bold text-gray-900'>
                ₱{appointment.paymentAmount.toLocaleString()}
              </span>
            </div>
            {appointment.paymentMethod && (
              <div className='flex justify-between items-center mt-2'>
                <span className='text-gray-600'>Method:</span>
                <span className='text-gray-900 capitalize'>
                  {appointment.paymentMethod}
                </span>
              </div>
            )}
          </div>
        </div>

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
        <div className='flex justify-end gap-2 pt-4 border-t'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentDetailsModal;
