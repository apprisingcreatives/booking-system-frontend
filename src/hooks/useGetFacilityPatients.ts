import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { User } from '../models/user';

const useGetFacilityPatients = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async (facilityId: string) => {
    if (!facilityId) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.get(
        `${API_URL}/facilities/${facilityId}/patients`
      );

      if (res && res.status === 200) {
        setPatients(res.data.patients || []);
      } else {
        const message = res.data?.message || 'Failed to fetch patients';
        setErrorMessage(message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    patients,
    loading,
    errorMessage,
    sendRequest,
  };
};

export default useGetFacilityPatients;
