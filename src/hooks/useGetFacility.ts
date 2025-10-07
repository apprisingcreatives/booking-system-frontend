// src/hooks/useGetFacility.ts
import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { Facility } from '../models';

const useGetFacility = () => {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchFacility = async (facilityId: string) => {
    if (!facilityId) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.get(`${API_URL}/facilities/${facilityId}`);

      if (res && res.status === 200) {
        setFacility(res.data.data.facility);
      } else {
        const message = res.data?.message || 'Failed to fetch facility';
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
    facility,
    loading,
    errorMessage,
    fetchFacility,
  };
};

export default useGetFacility;
