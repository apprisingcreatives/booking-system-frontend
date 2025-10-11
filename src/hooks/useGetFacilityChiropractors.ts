import { useState } from 'react';
import { API_URL } from '../constants/api';
import { AxiosError } from 'axios';
import { Chiropractor } from '../models';
import authClient from '../services/authClient';

const useGetFacilityChiropractors = () => {
  const [chiropractors, setChiropractors] = useState<Chiropractor[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async (facilityId: string) => {
    setLoading(true);
    try {
      const res = await authClient.get(
        `${API_URL}/facilities/${facilityId}/chiropractors`
      );

      if (res && res.status === 200) {
        setChiropractors(res.data.data.chiropractors);
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

  return { sendRequest, loading, errorMessage, chiropractors };
};

export default useGetFacilityChiropractors;
