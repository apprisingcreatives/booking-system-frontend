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

const usePutDentistProfile = () => {
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
        `${API_URL}/users/${id}/create-dentist-profile`,
        values
      );

      if (res.status === 200) {
        onSuccess("Successfully created your dentist profile.");
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

export default usePutDentistProfile;
