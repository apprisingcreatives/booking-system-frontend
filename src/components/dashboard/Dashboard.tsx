import { useEffect, useMemo, useState, useCallback } from "react";
import {
  useAuth,
  useCancelAppointment,
  useGetCurrentUserAppointments,
  useGetDentistAppointments,
  useGetDentistProfile,
  useSnackbar,
} from "../../hooks";
import AppointmentCard from "./AppointmentCard";
import { CircularLoading, ConfirmModal, ErrorTypography } from "../common";
import RescheduleModal from "./RescheduleModal";
import { SnackbarType } from "../../constants/snackbar";
import { UserRole } from "../../models";
import { DashboardAppointment } from "./types";
import DashboardNotifModal from "./DashboardNotifModal";

const Dashboard = () => {
  const { user } = useAuth();
  const { role, hasDentistProfile } = user || {};
  const [cancelModal, setCancelModal] = useState({ open: false, id: "" });
  const [rescheduleModal, setRescheduleModal] = useState<{
    open: boolean;
    appointment: DashboardAppointment | null;
  }>({
    open: false,
    appointment: null,
  });
  console.log(
    ` role === UserRole.Dentist && !hasDentistProfile`,
    role === UserRole.Dentist && !hasDentistProfile
  );
  const [openNotifModal, setOpenNotifModal] = useState(
    role === UserRole.Dentist && !hasDentistProfile
  );

  const handleCloseNotifModal = () => {
    setOpenNotifModal(false);
  };

  const { snackbar } = useSnackbar();

  const { sendRequest: sendRequestGetDentistAppointments, appointmentDates } =
    useGetDentistAppointments();

  const {
    sendRequest: fetchAppointments,
    loading,
    appointments,
  } = useGetCurrentUserAppointments();

  const {
    sendRequest: fetchDentistProfile,
    data: dentistProfile,
    loading: loadingDentistProfile,
  } = useGetDentistProfile();

  const {
    sendRequest: cancelAppointment,
    loading: loadingCancel,
    errorMessage,
  } = useCancelAppointment();

  const isDentist = user?.role === UserRole.Dentist;

  const dentistAppointments: DashboardAppointment[] = useMemo(() => {
    return (
      dentistProfile?.appointments.map((appt) => ({
        appointmentDate: appt.appointmentDate,
        patient: appt.patient.name,
        id: appt._id,
        dentist: appt,
      })) || []
    );
  }, [dentistProfile]);

  const patientAppointments: DashboardAppointment[] = useMemo(() => {
    return (
      appointments?.map((appt) => ({
        appointmentDate: appt.appointmentDate,
        id: appt._id,
        dentist: appt.dentist,
      })) || []
    );
  }, [appointments]);

  const handleFetchData = useCallback(() => {
    if (!user) return;
    if (isDentist) fetchDentistProfile(user._id);
    else fetchAppointments(user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isDentist]);

  const handleCancelSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    setCancelModal({ open: false, id: "" });
    handleFetchData();
  };

  const handleCancelError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };

  const handleCancelClick = (id: string) => setCancelModal({ open: true, id });

  const handleRescheduleClick = (appointment: DashboardAppointment) => {
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

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dentistProfile?._id && user?.role === UserRole.Dentist) {
      sendRequestGetDentistAppointments(dentistProfile?._id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dentistProfile]);

  const renderAppointments = () => {
    const list: DashboardAppointment[] = isDentist
      ? dentistAppointments
      : patientAppointments;

    if (!list?.length) {
      return (
        <p className="text-center text-xl font-semibold italic">
          You currently don't have any appointments.
        </p>
      );
    }

    return (
      <ul className="space-y-4">
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

  if (loading || loadingDentistProfile) {
    return (
      <div className="flex justify-center items-center w-full">
        <CircularLoading size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl p-8 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Your Appointments
      </h2>

      {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
      {renderAppointments()}

      <ConfirmModal
        open={cancelModal.open}
        title="Cancel Appointment"
        messageContent="Are you sure you want to cancel your appointment?"
        handleClose={() => setCancelModal({ open: false, id: "" })}
        onYesClick={handleConfirmCancel}
        loading={loadingCancel}
        maxSize="md"
      />

      <RescheduleModal
        open={rescheduleModal.open}
        appointment={rescheduleModal.appointment}
        title="Reschedule Appointment"
        handleClose={handleCancelReschedule}
        refetchAppointments={handleFetchData}
        appointmentDates={appointmentDates}
      />
      <DashboardNotifModal
        open={openNotifModal}
        handleClose={handleCloseNotifModal}
        title="Welcome!"
        userName={user?.name || ""}
      />
    </div>
  );
};

export default Dashboard;
