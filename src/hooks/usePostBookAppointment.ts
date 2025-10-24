import { useState } from 'react';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { AxiosError } from 'axios';
import { combineDateTime } from '../utils/dateFormatter';

type SendRequestParams = {
  values: {
    chiropractorId: string;
    appointmentDate: Date | string;
    serviceId: string;
    time: string;
    notes?: string;
  };
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const GENERAL_ERROR = 'Could not create booking, try again later';
const GENERAL_SUCCESS = 'Successfully booked appointment.';

const usePostBookAppointment = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const sendRequest = async ({
    values,
    onSuccess,
    onError,
  }: SendRequestParams) => {
    setLoading(true);
    const {
      appointmentDate,
      time,
      chiropractorId,
      serviceId,
      notes = '',
    } = values;

    const appointmentDateTime = combineDateTime(appointmentDate, time);

    const params = {
      chiropractor: chiropractorId,
      appointmentDate: appointmentDateTime,
      serviceId,
      notes,
    };

    try {
      const res = await authClient.post(`${API_URL}/appointments/book`, params);
      if (res && res.status === 201) {
        onSuccess(GENERAL_SUCCESS);
      } else {
        onError(GENERAL_ERROR);
        setErrorMessage(GENERAL_ERROR);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, errorMessage };
};

export default usePostBookAppointment;
