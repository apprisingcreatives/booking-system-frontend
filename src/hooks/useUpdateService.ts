import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { Service } from '../models/user';

type UpdateServiceParams = {
  facilityId: string;
  serviceId: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  onSuccess: (service: Service, message: string) => void;
  onError: (message: string) => void;
};

const useUpdateService = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateService = async ({
    facilityId,
    serviceId,
    name,
    description,
    durationMinutes,
    price,
    onSuccess,
    onError,
  }: UpdateServiceParams) => {
    setLoading(true);
    setErrorMessage('');

    const params = {
      name,
      description,
      durationMinutes,
      price,
    };

    try {
      const res = await authClient.put(
        `${API_URL}/facilities/${facilityId}/services/${serviceId}`,
        params
      );

      if (res && res.status === 200) {
        const service = res.data.data.service;
        onSuccess(service, 'Service updated successfully');
      } else {
        const message = res.data?.message || 'Failed to update service';
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

  return { updateService, loading, errorMessage };
};

export default useUpdateService;
