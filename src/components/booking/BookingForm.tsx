import { Form, Formik } from "formik";
import { Button, ErrorTypography } from "../common";
import { bookingsSchema, formikInitialValues } from "./constants";
import {
  useGetDentistUsers,
  usePostBookAppointment,
  useSnackbar,
} from "../../hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarType } from "../../constants/snackbar";
import InputFields from "./InputFields";

const BookingForm = () => {
  const { sendRequest, dentists } = useGetDentistUsers();
  const {
    sendRequest: sendRequestBookAppointment,
    loading: loadingBookAppointment,
    errorMessage: errorMessageBookAppointment,
  } = usePostBookAppointment();

  const { snackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    navigate("/dashboard", { replace: true });
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };
  const onSubmit = (values: {
    dentistId: string;
    appointmentDate: Date | string;
    time: string;
    reason: string;
  }) => {
    sendRequestBookAppointment({
      values,
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={formikInitialValues}
      validationSchema={bookingsSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">
        {errorMessageBookAppointment && (
          <ErrorTypography>{errorMessageBookAppointment}</ErrorTypography>
        )}
        <InputFields dentists={dentists || []} />
        <div className="flex justify-end">
          <Button
            variant="primary"
            type="submit"
            loading={loadingBookAppointment}
          >
            Confirm Appointment
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default BookingForm;
