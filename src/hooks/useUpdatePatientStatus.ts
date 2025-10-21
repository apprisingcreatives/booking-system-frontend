import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { UserStatus } from '../models/user';

type UpdatePatientStatusParams = {
  facilityId: string;
  patientId: string;
  status: UserStatus;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useUpdatePatientStatus = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async ({
    facilityId,
    patientId,
    status,
    onSuccess,
    onError,
  }: UpdatePatientStatusParams) => {
    if (!facilityId || !patientId || !status) {
      onError('Missing required parameters');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.put(
        `${API_URL}/facilities/${facilityId}/patients/${patientId}/status`,
        { status }
      );

      if (res && res.status === 200) {
        onSuccess(res.data.message || 'Patient status updated successfully');
      } else {
        const message = res.data?.message || 'Failed to update patient status';
        setErrorMessage(message);
        onError(message);
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

  return {
    loading,
    errorMessage,
    sendRequest,
  };
};

export default useUpdatePatientStatus;
