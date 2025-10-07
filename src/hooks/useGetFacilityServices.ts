import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { Service } from '../models/user';

const useGetFacilityServices = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchServices = async (facilityId: string) => {
    if (!facilityId) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.get(
        `${API_URL}/facilities/${facilityId}/services`
      );

      if (res && res.status === 200) {
        setServices(res.data.data.services || []);
      } else {
        const message = res.data?.message || 'Failed to fetch services';
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
    services,
    loading,
    errorMessage,
    fetchServices,
    refetch: (facilityId: string) => fetchServices(facilityId),
  };
};

export default useGetFacilityServices;
