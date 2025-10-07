import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { User } from '../models/user';

const useGetFacilityUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async (facilityId: string) => {
    if (!facilityId) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.get(
        `${API_URL}/facilities/${facilityId}/users`
      );

      if (res && res.status === 200) {
        setUsers(res.data.data || []);
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
    users,
    loading,
    errorMessage,
    sendRequest,
  };
};

export default useGetFacilityUsers;
