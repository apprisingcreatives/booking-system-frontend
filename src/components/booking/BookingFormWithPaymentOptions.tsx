import { Form, Formik } from 'formik';
import { Button, ErrorTypography } from '../common';
import { PaymentModal } from '../payment';
import { bookingsSchema, formikInitialValues } from './constants';
import {
  useGetDentistUsers,
  usePostBookAppointment,
  useBookAppointmentWithCash,
  useSnackbar,
} from '../../hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarType } from '../../constants/snackbar';
import { PaymentMethod } from '../../models';
import InputFields from './InputFields';

const BOOKING_FEE = 500; // Default booking fee in PHP

const BookingFormWithPaymentOptions = () => {
  const { sendRequest, dentists } = useGetDentistUsers();
  const {
    sendRequest: sendRequestBookAppointment,
    loading: loadingBookAppointment,
    errorMessage: errorMessageBookAppointment,
  } = usePostBookAppointment();
  const {
    sendRequest: sendRequestBookWithCash,
    loading: loadingBookWithCash,
    errorMessage: errorMessageBookWithCash,
  } = useBookAppointmentWithCash();

  const { snackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState<{
    dentistId: string;
    appointmentDate: Date | string;
    time: string;
    reason: string;
  } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const onSuccess = (message: string) => {
    snackbar(message, SnackbarType.SUCCESS, true, 6000);
    navigate('/dashboard', { replace: true });
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
    // Store appointment data
    setAppointmentData(values);

    // Show payment method selection
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);

    if (method === PaymentMethod.CASH) {
      // For cash payments, book appointment immediately
      handleCashPayment();
    } else {
      // For online payments, proceed with payment modal
      handleOnlinePayment();
    }
  };

  const handleCashPayment = async () => {
    if (!appointmentData) return;

    try {
      await sendRequestBookWithCash({
        dentist: appointmentData.dentistId,
        appointmentDate:
          appointmentData.appointmentDate instanceof Date
            ? appointmentData.appointmentDate.toISOString()
            : appointmentData.appointmentDate,
        reason: appointmentData.reason,
        amount: BOOKING_FEE,
        onSuccess,
        onError,
      });

      setShowPaymentModal(false);
      setAppointmentData(null);
      setSelectedPaymentMethod(null);
    } catch {
      // Error is handled by the hook
    }
  };

  const handleOnlinePayment = () => {
    // This will be handled by the PaymentModal
  };

  const handlePaymentSuccess = () => {
    if (appointmentData) {
      sendRequestBookAppointment({
        values: appointmentData,
        onSuccess,
        onError,
      });
    }
    setShowPaymentModal(false);
    setAppointmentData(null);
    setSelectedPaymentMethod(null);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setAppointmentData(null);
    setSelectedPaymentMethod(null);
  };

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = loadingBookAppointment || loadingBookWithCash;
  const errorMessage = errorMessageBookAppointment || errorMessageBookWithCash;

  return (
    <>
      <Formik
        initialValues={formikInitialValues}
        validationSchema={bookingsSchema}
        onSubmit={onSubmit}
      >
        <Form className='space-y-4'>
          {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
          <InputFields dentists={dentists || []} />

          {/* Booking Fee Display */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h4 className='font-medium text-blue-900'>Booking Fee</h4>
                <p className='text-sm text-blue-700'>
                  Required to confirm your appointment
                </p>
              </div>
              <div className='text-right'>
                <p className='text-lg font-semibold text-blue-900'>
                  ₱{BOOKING_FEE.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <Button variant='primary' type='submit' loading={isLoading}>
              Book Appointment
            </Button>
          </div>
        </Form>
      </Formik>

      <PaymentModal
        open={showPaymentModal}
        onClose={handlePaymentCancel}
        appointmentId={appointmentData?.dentistId || ''}
        amount={BOOKING_FEE}
        onSuccess={handlePaymentSuccess}
        onPaymentMethodSelect={handlePaymentMethodSelect}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    </>
  );
};

export default BookingFormWithPaymentOptions;
