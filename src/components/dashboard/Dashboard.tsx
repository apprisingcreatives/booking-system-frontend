/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  useAuth,
  useCancelAppointment,
  useGetCurrentUserAppointments,
  useGetFacilityAppointments,
  useSnackbar,
} from '../../hooks';
import AppointmentCard from './AppointmentCard';
import { CircularLoading, ErrorTypography } from '../common';
import RescheduleModal from './RescheduleModal';
import { SnackbarType } from '../../constants/snackbar';
import { Appointment, UserRole } from '../../models';
import ConfirmModal from '../common/modal/ConfirmModal';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { facilityId, role } = user || {};
  const [cancelModal, setCancelModal] = useState({ open: false, id: '' });
  const [rescheduleModal, setRescheduleModal] = useState<{
    open: boolean;
    appointment: Appointment | null;
  }>({
    open: false,
    appointment: null,
  });

  // const [openNotifModal, setOpenNotifModal] = useState(
  //   role === UserRole.ClientUser && !hasDentistProfile
  // );

  const { snackbar } = useSnackbar();

  const {
    sendRequest: fetchAppointments,
    loading,
    appointments: patientAppointments,
  } = useGetCurrentUserAppointments();

  const {
    appointments: facilityAppointments,
    errorMessage: facilityErrorMessage,
    loading: facilityLoading,
    sendRequest: fetchFacilityAppointments,
  } = useGetFacilityAppointments();
  const {
    sendRequest: cancelAppointment,
    loading: loadingCancel,
    errorMessage,
  } = useCancelAppointment();

  // const handleCloseNotifModal = () => {
  //   setOpenNotifModal(false);
  // };

  const facilityUser = useMemo(
    () =>
      user?.role === UserRole.ClientUser || user?.role === UserRole.ClientAdmin,
    [user]
  );

  const handleFetchData = useCallback(() => {
    if (!user) return;
    if (facilityUser) {
      fetchFacilityAppointments(facilityId as string);
      return;
    } else {
      fetchAppointments(user._id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, facilityUser]);

  const handleCancelSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    setCancelModal({ open: false, id: '' });
    handleFetchData();
  };

  const handleCancelError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const handleCancelClick = (id: string) => setCancelModal({ open: true, id });

  const handleRescheduleClick = (appointment: Appointment) => {
    setRescheduleModal({ open: true, appointment });
  };

  const handleConfirmCancel = () => {
    cancelAppointment({
      id: cancelModal.id,
      onSuccess: handleCancelSuccess,
      onError: handleCancelError,
    });
  };

  const handleCancelReschedule = () => {
    setRescheduleModal({ open: false, appointment: null });
  };

  const navigate = useNavigate();
  const handleBookAppointment = () => {
    navigate('/booking');
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAppointments = () => {
    const list: Appointment[] | null = facilityUser
      ? facilityAppointments
      : patientAppointments;

    if (!list?.length) {
      return (
        <div className='text-center py-16 gap-y-2 flex flex-col items-center'>
          <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
            <span className='text-4xl'>📅</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            No appointments yet
          </h3>
          {user?.role === UserRole.Patient && (
            <p className='text-gray-500 max-w-md mx-auto'>
              You don't have any appointments scheduled. Book your first
              appointment to get started!
            </p>
          )}
          {role !== UserRole.Chiropractor && (
            <Button variant='primary' onClick={handleBookAppointment}>
              {user?.role === UserRole.Patient
                ? 'Book Appointment'
                : 'Create New Appointment'}
            </Button>
          )}
        </div>
      );
    }

    return (
      <ul className='space-y-4'>
        {list.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            onClickCancel={handleCancelClick}
            onClickReschedule={handleRescheduleClick}
          />
        ))}
      </ul>
    );
  };

  if (loading || facilityLoading) {
    return (
      <div className='flex justify-center items-center w-full'>
        <CircularLoading size='lg' />
      </div>
    );
  }

  return (
    <div className='w-full p-8'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>
          Your Appointments
        </h2>
        <p className='text-gray-600'>
          View and manage your upcoming appointments
        </p>
      </div>

      {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
      {facilityErrorMessage && (
        <ErrorTypography>{facilityErrorMessage}</ErrorTypography>
      )}
      {renderAppointments()}

      <ConfirmModal
        open={cancelModal.open}
        title='Cancel Appointment'
        messageContent='Are you sure you want to cancel your appointment?'
        handleClose={() => setCancelModal({ open: false, id: '' })}
        onYesClick={handleConfirmCancel}
        loading={loadingCancel}
        maxSize='md'
      />

      <RescheduleModal
        open={rescheduleModal.open}
        appointment={rescheduleModal.appointment}
        title='Reschedule Appointment'
        handleClose={handleCancelReschedule}
        refetchAppointments={handleFetchData}
        appointmentDates={null}
      />
      {/* <DashboardNotifModal
        open={openNotifModal}
        handleClose={handleCloseNotifModal}
        title='Welcome!'
        userName={user?.fullName || ''}
      /> */}
    </div>
  );
};

export default Dashboard;
