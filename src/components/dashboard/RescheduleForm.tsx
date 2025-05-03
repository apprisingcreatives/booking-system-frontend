import {
  Button,
  ErrorTypography,
  InputLabel,
  TimeSelectInput,
} from "../common";
import { Form, Formik } from "formik";
import { formikInitialValues, rescheduleSchema } from "./constant";
import { SnackbarType } from "../../constants/snackbar";
import { useRescheduleAppointment, useSnackbar } from "../../hooks";

type Props = {
  onCancelReschedule: () => void;
  id: string;
  refetchAppointments: () => void;
};

const RescheduleForm = ({
  onCancelReschedule,
  id,
  refetchAppointments,
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
    sendRequest({
      id,
      values,
      onSuccess,
      onError,
    });
  };

  return (
    <Formik
      initialValues={formikInitialValues}
      validationSchema={rescheduleSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">
        {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
        <div className="flex md:flex-row flex-col justify-between gap-4">
          <InputLabel
            id="appointmentDate"
            label="Select Date"
            name="appointmentDate"
            type="date"
            className="flex-1"
          />
          <TimeSelectInput
            name="time"
            label="Select Time"
            id="time"
            bookedTimes={["10:00", "11:30"]}
            className="flex-1"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-2 justify-end">
          <Button variant="primary" type="submit" loading={loading}>
            Reschedule
          </Button>
          <Button variant="secondary" onClick={onCancelReschedule}>
            Cancel
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default RescheduleForm;
