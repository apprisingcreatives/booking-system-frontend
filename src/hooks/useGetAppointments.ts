import { useState, useCallback } from 'react';
import { API_URL } from '../constants/api';
import { AxiosError } from 'axios';
import authClient from '../services/authClient';
import { Appointment } from '../models';

interface UseGetAppointmentsParams {
  facilityId?: string;
  patientId?: string;
  chiropractorId?: string;
}

const useGetAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = useCallback(
    async (params: UseGetAppointmentsParams = {}) => {
      setLoading(true);
      setErrorMessage('');

      try {
        let endpoint = `${API_URL}/appointments`;

        // Build query based on params
        if (params.facilityId) {
          endpoint = `${API_URL}/appointments/facility/${params.facilityId}`;
        } else if (params.patientId) {
          endpoint = `${API_URL}/appointments/patient/${params.patientId}`;
        } else if (params.chiropractorId) {
          endpoint = `${API_URL}/appointments/chiropractor/${params.chiropractorId}`;
        }

        const res = await authClient.get(endpoint);

        if (res && res.status === 200) {
          setAppointments(res.data.appointments || res.data.data || []);
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const message =
          error.response?.data?.message ||
          'An error occurred while fetching appointments.';
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { sendRequest, loading, errorMessage, appointments };
};

export default useGetAppointments;
