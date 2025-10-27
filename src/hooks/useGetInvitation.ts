import { useState } from 'react';
import { AxiosError } from 'axios';
import guestClient from '../services/guestClient';
import { API_URL } from '../constants/api';
import { Invitation } from '../models/user';

interface PatientDetails {
  fullName: string;
  email: string;
  phone: string;
}

const useGetInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState('');

  const getInvitation = async (token: string) => {
    setLoading(true);
    setErrorMessage('');
    setInvitation(null);
    setPatientDetails(null);

    try {
      const res = await guestClient.get(`${API_URL}/invitations/${token}`);

      if (res && res.status === 200) {
        setInvitation(res.data.data.invitation);
        setPatientDetails(res.data.data.patientDetails || null);
      } else {
        const message = res.data?.message || 'Failed to fetch invitation';
        setErrorMessage(message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || 'Invalid or expired invitation';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return { getInvitation, invitation, patientDetails, loading, errorMessage };
};

export default useGetInvitation;
