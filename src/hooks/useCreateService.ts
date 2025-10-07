import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { Service } from '../models/user';

type CreateServiceParams = {
  facilityId: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  onSuccess: (service: Service, message: string) => void;
  onError: (message: string) => void;
};

const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const createService = async ({
    facilityId,
    name,
    description,
    durationMinutes,
    price,
    onSuccess,
    onError,
  }: CreateServiceParams) => {
    setLoading(true);
    setErrorMessage('');

    const params = {
      name,
      description,
      durationMinutes,
      price,
    };

    try {
      const res = await authClient.post(
        `${API_URL}/facilities/${facilityId}/services`,
        params
      );

      if (res && res.status === 201) {
        const service = res.data.data.service;
        onSuccess(service, 'Service created successfully');
      } else {
        const message = res.data?.message || 'Failed to create service';
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

  return { createService, loading, errorMessage };
};

export default useCreateService;
