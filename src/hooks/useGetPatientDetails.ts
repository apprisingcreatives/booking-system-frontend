import { useState } from 'react';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { API_URL } from '../constants/api';
import { User } from '../models/user';
import { Appointment } from '../models';

interface PatientDetails {
  patient: User;
  statistics: {
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    upcomingAppointments: number;
  };
  appointments: Appointment[];
}

const useGetPatientDetails = () => {
  const [loading, setLoading] = useState(false);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async (facilityId: string, patientId: string) => {
    if (!facilityId || !patientId) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await authClient.get(
        `${API_URL}/facilities/${facilityId}/patients/${patientId}`
      );

      if (res && res.status === 200) {
        setPatientDetails(res.data.data);
      } else {
        const message = res.data?.message || 'Failed to fetch patient details';
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
    patientDetails,
    loading,
    errorMessage,
    sendRequest,
  };
};

export default useGetPatientDetails;
