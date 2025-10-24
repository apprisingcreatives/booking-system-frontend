import { useState } from 'react';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { AxiosError } from 'axios';

const useCompleteAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async (
    appointmentId: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.post(
        `${API_URL}/appointments/completed/${appointmentId}`
      );

      if (res && res.status === 200) {
        onSuccess();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        'An error occurred while completing the appointment.';
      setErrorMessage(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, errorMessage };
};

export default useCompleteAppointment;
