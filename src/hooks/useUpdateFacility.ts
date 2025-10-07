import { useState } from 'react';
import { AxiosError } from 'axios';
import { Facility } from '../models';
import { API_URL } from '../constants/api';
import authClient from '../services/authClient';

type SendRequestParams = {
  id: string;
  data: Partial<Facility>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

interface UseUpdateFacilityReturn {
  updateFacility: ({
    id,
    data,
    onSuccess,
    onError,
  }: SendRequestParams) => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const useUpdateFacility = (): UseUpdateFacilityReturn => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateFacility = async ({
    id,
    data,
    onSuccess,
    onError,
  }: SendRequestParams) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await authClient.put(`${API_URL}/facilities/${id}`, data, {
        withCredentials: true,
      });

      if (res.data?.status === 'success') {
        setSuccessMessage('Facility updated successfully');
        onSuccess('Facility updated successfully');
      } else {
        throw new Error('Unexpected response format');
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

  return { updateFacility, loading, errorMessage, successMessage };
};

export default useUpdateFacility;
