import { useState } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";

export type UpdateUserPassword = {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

type SendRequestParams = {
  id: string;
  values: UpdateUserPassword;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const usePutUserPassword = () => {
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

    try {
      const res = await authClient.put(
        `${API_URL}/users/${id}/update-password`,
        values
      );

      if (res.status === 200) {
        onSuccess("Successfully updated password.");
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

export default usePutUserPassword;
