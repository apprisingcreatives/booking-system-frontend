import { Formik } from 'formik';
import { rescheduleSchema } from './constant';
import { SnackbarType } from '../../constants/snackbar';
import { useRescheduleAppointment, useSnackbar } from '../../hooks';
import { splitDateTime } from '../../utils/dateFormatter';
import RescheduleFormInner from './ReschedulFormInner';
import { DentistAppointment } from '../../hooks/useGetDentistAppointments';
import { Appointment } from '../../models';

type Props = {
  onCancelReschedule: () => void;
  appointment: Appointment | null;
  refetchAppointments: () => void;
  appointmentDates: DentistAppointment[] | null;
};

const RescheduleForm = ({
  onCancelReschedule,
  appointment,
  refetchAppointments,
  appointmentDates,
}: Props) => {
  const { sendRequest, loading, errorMessage } = useRescheduleAppointment();

  const { snackbar } = useSnackbar();

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    onCancelReschedule();
    refetchAppointments();
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };
  const onSubmit = (values: {
    appointmentDate: Date | string;
    time: string;
  }) => {
    if (appointment?.id) {
      sendRequest({
        id: appointment?.id as string,
        values,
        onSuccess,
        onError,
      });
    }
  };
  const initialValueTime = splitDateTime(
    appointment?.appointmentDate as Date
  ).time;

  const initialValueDate = splitDateTime(
    appointment?.appointmentDate as Date
  ).date;

  return (
    <Formik
      initialValues={{
        appointmentDate: initialValueDate || '',
        time: initialValueTime || '',
      }}
      validationSchema={rescheduleSchema}
      onSubmit={onSubmit}
    >
      <RescheduleFormInner
        onCancelReschedule={onCancelReschedule}
        refetchAppointments={refetchAppointments}
        errorMessage={errorMessage}
        loading={loading}
        appointmentDates={appointmentDates || []}
      />
    </Formik>
  );
};

export default RescheduleForm;
