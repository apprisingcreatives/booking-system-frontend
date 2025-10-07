import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';

type DeleteServiceParams = {
  facilityId: string;
  serviceId: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useDeleteService = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteService = async ({
    facilityId,
    serviceId,
    onSuccess,
    onError,
  }: DeleteServiceParams) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.delete(
        `${API_URL}/facilities/${facilityId}/services/${serviceId}`
      );

      if (res && res.status === 204) {
        onSuccess('Service deleted successfully');
      } else {
        const message = res.data?.message || 'Failed to delete service';
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

  return { deleteService, loading, errorMessage };
};

export default useDeleteService;
