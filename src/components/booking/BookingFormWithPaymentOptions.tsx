import { Form, Formik } from 'formik';
import { ErrorTypography } from '../common';
import { PaymentModal } from '../payment';
import { bookingsSchema, formikInitialValues } from './constants';
import {
  usePostBookAppointment,
  useBookAppointmentWithCash,
  useSnackbar,
  useAuth,
  useGetFacilityChiropractors,
} from '../../hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarType } from '../../constants/snackbar';
import { PaymentMethod } from '../../models/payment';
import InputFields from './InputFields';
import Button from '../common/Button';

const BOOKING_FEE = 500; // Default booking fee in PHP

const BookingFormWithPaymentOptions = () => {
  const { user } = useAuth();
  const { facilityId } = user || {};
  const { sendRequest, chiropractors } = useGetFacilityChiropractors();
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
    chiropractorId: string;
    appointmentDate: Date | string;
    time: string;
    serviceId: string;
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
    chiropractorId: string;
    appointmentDate: Date | string;
    time: string;
    serviceId: string;
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
        chiropractor: appointmentData.chiropractorId,
        appointmentDate:
          appointmentData.appointmentDate instanceof Date
            ? appointmentData.appointmentDate.toISOString()
            : appointmentData.appointmentDate,
        serviceId: appointmentData.serviceId,
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
    sendRequest(`${facilityId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId]);

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
          <InputFields dentists={chiropractors || []} />

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
            <Button variant='primary' type='submit' loading={isLoading}>
              Book Appointment
            </Button>
          </div>
        </Form>
      </Formik>

      <PaymentModal
        open={showPaymentModal}
        onClose={handlePaymentCancel}
        appointmentId={appointmentData?.chiropractorId || ''}
        amount={BOOKING_FEE}
        onSuccess={handlePaymentSuccess}
        onPaymentMethodSelect={handlePaymentMethodSelect}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    </>
  );
};

export default BookingFormWithPaymentOptions;
