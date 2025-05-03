import { useState } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";

type UpdateUserValues = {
  name?: string;
  email?: string;
};

type SendRequestParams = {
  id: string;
  values: UpdateUserValues;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const usePutUserInfo = () => {
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
      const response = await authClient.put(
        `${API_URL}/users/${id}/update-me`,
        values
      );

      if (response.status === 200) {
        onSuccess("Successfully updated profile.");
      } else {
        const message = response.data?.message || "Unexpected response status.";
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

export default usePutUserInfo;
