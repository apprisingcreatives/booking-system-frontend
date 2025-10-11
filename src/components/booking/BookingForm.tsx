import { Form, Formik } from 'formik';
import { ErrorTypography } from '../common';
import { bookingsSchema, formikInitialValues } from './constants';
import {
  usePostBookAppointment,
  useSnackbar,
  useAuth,
  useGetFacilityChiropractors,
} from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarType } from '../../constants/snackbar';
import InputFields from './InputFields';
import Button from '../common/Button';

const BOOKING_FEE = 500; // Default booking fee in PHP

const BookingForm = () => {
  const { user } = useAuth();
  const { facilityId } = user || {};
  const { sendRequest, chiropractors } = useGetFacilityChiropractors();
  console.log(`booking`);
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
    console.log(`@@@@@@@@values`, values);
    // Directly send booking request (no payment modal)
    sendRequestBookAppointment({
      values,
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    if (facilityId) {
      sendRequest(`${facilityId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId]);

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
        <InputFields chiropractors={chiropractors || []} />

        {/* Booking Fee Display */}
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 shadow-sm'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                <span className='text-white text-lg'>💰</span>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900'>Booking Fee</h4>
                <p className='text-sm text-gray-600'>
                  Required to confirm your appointment
                </p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold text-gray-900'>
                ₱{BOOKING_FEE.toFixed(2)}
              </p>
              <p className='text-xs text-gray-500'>One-time payment</p>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            variant='primary'
            type='submit'
            loading={loadingBookAppointment}
          >
            Book Appointment
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default BookingForm;
