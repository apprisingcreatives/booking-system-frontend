import { useState } from 'react';
import { AxiosError } from 'axios';
import guestClient from '../services/guestClient';
import { API_URL } from '../constants/api';

type AcceptInvitationParams = {
  token: string;
  fullName: string;
  password: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useAcceptInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const acceptInvitation = async ({
    token,
    fullName,
    password,
    phone,
    specialization,
    licenseNumber,
    onSuccess,
    onError,
  }: AcceptInvitationParams) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await guestClient.post(
        `${API_URL}/invitations/accept/${token}`,
        {
          fullName,
          password,
          ...(phone && { phone }),
          ...(specialization && { specialization }),
          ...(licenseNumber && { licenseNumber }),
        }
      );

      const message =
        res.data?.message || 'Account created successfully. Please log in.';

      if (res.status === 201 || res.status === 200) {
        onSuccess(message);
      } else {
        setErrorMessage(message);
        onError(message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message ||
        'An unexpected error occurred. Please try again.';
      setErrorMessage(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return { acceptInvitation, loading, errorMessage };
};

export default useAcceptInvitation;
