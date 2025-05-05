import { useState } from "react";
import { API_URL } from "../constants/api";
import { AxiosError } from "axios";
import { User } from "../models";
import authClient from "../services/authClient";

export interface DentistAppointment extends User {
  appointmentDate: Date | string;
}

const useGetDentistAppointments = () => {
  const [appointmentDates, setAppointmentDates] = useState<
    DentistAppointment[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async (id: string) => {
    setLoading(true);
    try {
      const res = await authClient.get(`${API_URL}/appointments/dentist/${id}`);

      if (res && res.status === 200) {
        setAppointmentDates(res.data.appointmentDates);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, errorMessage, appointmentDates };
};

export default useGetDentistAppointments;
