import { useState } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";
import { combineDateTime } from "../utils/dateFormatter";

type SendRequestParams = {
  id: string;
  values: { appointmentDate: Date | string; time: string };
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useRescheduleAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async ({
    id,
    values,
    onSuccess,
    onError,
  }: SendRequestParams) => {
    setLoading(true);
    setErrorMessage("");

    const { appointmentDate, time } = values;

    const appointmentDateTime = combineDateTime(appointmentDate, time);

    const params = {
      appointmentDate: appointmentDateTime,
    };

    try {
      const res = await authClient.put(
        `${API_URL}/appointments/reschedule/${id}`,
        params
      );

      if (res.status === 200) {
        onSuccess("Appointment rescheduled.");
      } else {
        const message = res.data?.message || "Unexpected response status.";
        setErrorMessage(message);
        onError(message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      setErrorMessage(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, errorMessage };
};

export default useRescheduleAppointment;
