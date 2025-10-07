import { Form, Formik } from 'formik';
import { ErrorTypography } from '../common';
import { bookingsSchema, formikInitialValues } from './constants';
import {
  useAuth,
  useGetFacilityChiropractors,
  usePostBookAppointment,
  useSnackbar,
} from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarType } from '../../constants/snackbar';
import InputFields from './InputFields';
import Button from '../common/Button';

const BookingForm = () => {
  const { sendRequest, chiropractors } = useGetFacilityChiropractors();
  const { user } = useAuth();
  const { facilityId } = user || {};
  const {
    sendRequest: sendRequestBookAppointment,
    loading: loadingBookAppointment,
    errorMessage: errorMessageBookAppointment,
  } = usePostBookAppointment();

  const { snackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    navigate('/dashboard', { replace: true });
  };

  const onError = (message: string) => {
    snackbar(message, SnackbarType.ERROR, true, 6000);
  };
  const onSubmit = (values: {
    chiropractorId: string;
    appointmentDate: Date | string;
    time: string;
    serviceId: string;
  }) => {
    sendRequestBookAppointment({
      values,
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    sendRequest(`${facilityId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId]);
  console.log(`test`);
  return (
    <Formik
      initialValues={formikInitialValues}
      validationSchema={bookingsSchema}
      onSubmit={onSubmit}
    >
      <Form className='space-y-4'>
        {errorMessageBookAppointment && (
          <ErrorTypography>{errorMessageBookAppointment}</ErrorTypography>
        )}
        <InputFields dentists={chiropractors || []} />
        <div className='flex justify-end'>
          <Button
            variant='primary'
            type='submit'
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
