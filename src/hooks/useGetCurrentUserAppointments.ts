import { useState } from "react";
import { API_URL } from "../constants/api";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { Appointment } from "../models";

const useGetCurrentUserAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async (id: string) => {
    setLoading(true);
    try {
      const res = await authClient.get(`${API_URL}/appointments/patient/${id}`);

      if (res && res.status === 200) {
        setAppointments(res.data.appointments);
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

  return { sendRequest, loading, errorMessage, appointments };
};

export default useGetCurrentUserAppointments;
