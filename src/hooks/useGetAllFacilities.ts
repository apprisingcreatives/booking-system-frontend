// src/hooks/useGetFacility.ts
import { useState } from 'react';
import { AxiosError } from 'axios';
import { API_URL } from '../constants/api';
import { Facility } from '../models';
import guestClient from '../services/guestClient';

const useGetAllFacility = () => {
  const [facilities, setFacilities] = useState<Facility[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await guestClient.get(`${API_URL}/facilities`);

      if (res && res.status === 200) {
        setFacilities(res.data.data.facilities);
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
    facilities,
    loading,
    errorMessage,
    sendRequest,
  };
};

export default useGetAllFacility;
