import { useState, useCallback } from 'react';
import { API_URL } from '../constants/api';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';

interface CreatePatientParams {
  facilityId: string;
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const useCreatePatient = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = useCallback(
    async ({
      facilityId,
      fullName,
      email,
      phone,
      password,
      onSuccess,
      onError,
    }: CreatePatientParams) => {
      setLoading(true);
      setErrorMessage('');

      try {
        const res = await authClient.post(
          `${API_URL}/facilities/${facilityId}/patients`,
          {
            fullName,
            email,
            phone,
            password,
          }
        );

        if (res && res.status === 201) {
          onSuccess?.(res.data.message || 'Patient created successfully');
        } else {
          const message = res.data?.message || 'Failed to create patient';
          setErrorMessage(message);
          onError?.(message);
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const message =
          error.response?.data?.message ||
          'An error occurred. Please try again.';
        setErrorMessage(message);
        onError?.(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    errorMessage,
    sendRequest,
  };
};

export default useCreatePatient;
