import { useState } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";

type SendRequestParams = {
  id: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useCancelAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async ({ id, onSuccess, onError }: SendRequestParams) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await authClient.put(`${API_URL}/appointments/cancel/${id}`);

      if (res.status === 200) {
        onSuccess("Appointment cancelled.");
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

export default useCancelAppointment;
