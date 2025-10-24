/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { User, UserStatus } from '../../models/user';
import { Modal, CircularLoading, ErrorTypography } from '../common';
import {
  useGetPatientDetails,
  useUpdatePatientStatus,
  useSnackbar,
  useAuth,
} from '../../hooks';

import { SnackbarType } from '../../constants/snackbar';
import { UserRole } from '../../models/user';
import { getStatusColor } from './helpers';
import { formatDate, formatDateTimeFns } from '../../utils/dateFormatter';
import { canUpdatePatientStatus } from '../../utils/permissions';
import Select from '../common/Select';
import { patientStatusOptions } from './constants';
import Button from '../common/Button';

interface PatientDetailsModalProps {
  isOpen: boolean;
  patient: User | null;
  facilityId: string;
  onClose: () => void;
  onStatusUpdate: () => void;
}

const PatientDetailsModal = ({
  isOpen,
  patient,
  facilityId,
  onClose,
  onStatusUpdate,
}: PatientDetailsModalProps) => {
  const { user } = useAuth();
  const { snackbar } = useSnackbar();
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | ''>('');

  const {
    patientDetails,
    loading,
    errorMessage,
    sendRequest: fetchPatientDetails,
  } = useGetPatientDetails();

  const { loading: updatingStatus, sendRequest: updateStatus } =
    useUpdatePatientStatus();

  useEffect(() => {
    if (isOpen && patient && facilityId) {
      fetchPatientDetails(facilityId, patient._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, patient?._id, facilityId]);

  useEffect(() => {
    if (patient) {
      setSelectedStatus(patient.status);
    }
  }, [patient]);

  const handleStatusChange = () => {
    if (!patient || !selectedStatus || selectedStatus === patient.status)
      return;

    updateStatus({
      facilityId,
      patientId: patient._id,
      status: selectedStatus as UserStatus,
      onSuccess: (message) => {
        snackbar(message, SnackbarType.SUCCESS, true, 3000);
        onStatusUpdate();
        onClose();
      },
      onError: (message) => {
        snackbar(message, SnackbarType.ERROR, true, 5000);
      },
    });
  };

  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Patient Details' size='xl'>
      {loading && !patientDetails ? (
        <div className='flex justify-center items-center py-12'>
          <CircularLoading size='md' />
        </div>
      ) : (
        <div className='space-y-6'>
          {errorMessage && (
            <div className='mb-4'>
              <ErrorTypography>{errorMessage}</ErrorTypography>
            </div>
          )}

          {/* Patient Info */}
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg'>
            <div className='flex items-start justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl font-semibold'>
                    {patient.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    {patient.fullName}
                  </h3>
                  <p className='text-gray-600'>{patient.email}</p>
                  {patient.phone && (
                    <p className='text-gray-600'>📱 {patient.phone}</p>
                  )}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  patient.status
                )}`}
              >
                {patient.status.charAt(0).toUpperCase() +
                  patient.status.slice(1)}
              </span>
            </div>
            <div className='mt-4 text-sm text-gray-600'>
              Patient since {formatDate(patient.createdAt)}
            </div>
          </div>

          {/* Statistics */}
          {patientDetails && (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-white border border-gray-200 rounded-lg p-4'>
                <p className='text-xs text-gray-500 mb-1'>Total</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {patientDetails.statistics.totalAppointments}
                </p>
                <p className='text-xs text-gray-500 mt-1'>Appointments</p>
              </div>
              <div className='bg-white border border-gray-200 rounded-lg p-4'>
                <p className='text-xs text-gray-500 mb-1'>Completed</p>
                <p className='text-2xl font-bold text-green-600'>
                  {patientDetails.statistics.completedAppointments}
                </p>
                <p className='text-xs text-gray-500 mt-1'>Sessions</p>
              </div>
              <div className='bg-white border border-gray-200 rounded-lg p-4'>
                <p className='text-xs text-gray-500 mb-1'>Upcoming</p>
                <p className='text-2xl font-bold text-blue-600'>
                  {patientDetails.statistics.upcomingAppointments}
                </p>
                <p className='text-xs text-gray-500 mt-1'>Scheduled</p>
              </div>
              <div className='bg-white border border-gray-200 rounded-lg p-4'>
                <p className='text-xs text-gray-500 mb-1'>Cancelled</p>
                <p className='text-2xl font-bold text-red-600'>
                  {patientDetails.statistics.cancelledAppointments}
                </p>
                <p className='text-xs text-gray-500 mt-1'>Missed</p>
              </div>
            </div>
          )}

          {/* Status Management - Only for ClientAdmin */}
          {canUpdatePatientStatus(user?.role as UserRole) && (
            <div className='bg-white border border-gray-200 rounded-lg p-4'>
              <h4 className='text-sm font-semibold text-gray-900 mb-3'>
                Update Patient Status
              </h4>
              <div className='flex items-center space-x-4'>
                <Select
                  options={patientStatusOptions}
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as UserStatus)
                  }
                  disabled={updatingStatus}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />

                <Button
                  onClick={handleStatusChange}
                  disabled={
                    updatingStatus ||
                    !selectedStatus ||
                    selectedStatus === patient.status
                  }
                  className='w-full max-w-[150px]'
                >
                  {updatingStatus ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>
          )}

          {/* Appointment History */}
          {patientDetails && patientDetails.appointments.length > 0 && (
            <div>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                Appointment History
              </h4>
              <div className='space-y-3 max-h-96 overflow-y-auto'>
                {patientDetails.appointments.map((appointment: any) => (
                  <div
                    key={appointment._id}
                    className='bg-white border border-gray-200 rounded-lg p-4'
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2 mb-2'>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1).replace('_', ' ')}
                          </span>
                          <span className='text-sm text-gray-500'>
                            {formatDateTimeFns(appointment.appointmentDate)}
                          </span>
                        </div>
                        {appointment.chiropractorId && (
                          <p className='text-sm text-gray-700'>
                            <span className='font-medium'>Chiropractor:</span>{' '}
                            {appointment.chiropractorId.fullName}
                          </p>
                        )}
                        {appointment.serviceId && (
                          <p className='text-sm text-gray-700'>
                            <span className='font-medium'>Service:</span>{' '}
                            {appointment.serviceId.name}
                            {appointment.serviceId.price && (
                              <span className='text-gray-500'>
                                {' '}
                                - ₱{appointment.serviceId.price}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No appointments message */}
          {patientDetails && patientDetails.appointments.length === 0 && (
            <div className='text-center py-8 bg-gray-50 rounded-lg'>
              <p className='text-gray-500'>No appointment history available</p>
            </div>
          )}

          {/* Close Button */}
          <div className='flex justify-end pt-4 border-t'>
            <button
              onClick={onClose}
              className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PatientDetailsModal;
