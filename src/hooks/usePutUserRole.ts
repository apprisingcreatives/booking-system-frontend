import { useState } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";
import { UserRole } from "../models";

type SendRequestParams = {
  id: string;
  role: UserRole;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const usePutUserRole = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async ({
    id,
    role,
    onSuccess,
    onError,
  }: SendRequestParams) => {
    setLoading(true);
    setErrorMessage("");

    const params = { role };
    try {
      const res = await authClient.put(
        `${API_URL}/users/${id}/update-role`,
        params
      );

      if (res && res.status === 200) {
        const { message } = res.data;
        onSuccess(message);
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

export default usePutUserRole;
