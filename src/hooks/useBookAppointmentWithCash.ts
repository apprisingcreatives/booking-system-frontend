import { useState, useCallback } from 'react';
import { API_URL } from '../constants/api';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';

interface BookAppointmentWithCashParams {
  chiropractor: string;
  appointmentDate: string;
  serviceId: string;
  amount?: number;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const useBookAppointmentWithCash = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = useCallback(
    async ({
      chiropractor,
      appointmentDate,
      serviceId,
      amount = 500,
      onSuccess,
      onError,
    }: BookAppointmentWithCashParams) => {
      setLoading(true);
      setErrorMessage('');

      try {
        const res = await authClient.post(`${API_URL}/appointments/book-cash`, {
          chiropractor,
          appointmentDate,
          serviceId,
          amount,
        });

        if (res && res.status === 201) {
          const message =
            res.data.message ||
            'Appointment booked successfully with cash payment';
          onSuccess?.(message);
          return res.data.data;
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const message =
          error.response?.data?.message ||
          'An error occurred. Please try again.';
        setErrorMessage(message);
        onError?.(message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { sendRequest, loading, errorMessage };
};

export default useBookAppointmentWithCash;
