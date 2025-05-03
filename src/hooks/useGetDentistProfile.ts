import { useState } from "react";
import { API_URL } from "../constants/api";
import { AxiosError } from "axios";
import { Dentist } from "../models";
import authClient from "../services/authClient";

const useGetDentistProfile = () => {
  const [data, setData] = useState<Dentist | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async (id: string) => {
    setLoading(true);
    try {
      const res = await authClient.get(
        `${API_URL}/users/${id}/dentist-profile`
      );

      if (res && res.status === 200) {
        setData(res.data.user);
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

  return { sendRequest, loading, errorMessage, data };
};

export default useGetDentistProfile;
