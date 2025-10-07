import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { UserRole } from '../models/user';

type SendInvitationParams = {
  facilityId: string;
  email: string;
  role: UserRole;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useSendInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendInvitation = async ({
    facilityId,
    email,
    role,
    onSuccess,
    onError,
  }: SendInvitationParams) => {
    setLoading(true);
    setErrorMessage('');

    const params = { email, role };

    try {
      const res = await authClient.post(
        `${API_URL}/invitations/${facilityId}/send`,
        params
      );

      if (res && res.status === 201) {
        const { message } = res.data;
        onSuccess(message || 'Invitation sent successfully');
      } else {
        const message = res.data?.message || 'Failed to send invitation';
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

  return { sendInvitation, loading, errorMessage };
};

export default useSendInvitation;
