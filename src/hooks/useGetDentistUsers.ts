import { useState } from "react";
import { API_URL } from "../constants/api";
import guestClient from "../services/guestClient";
import { AxiosError } from "axios";
import { Dentist } from "../models";

const useGetDentistUsers = () => {
  const [dentists, setDentists] = useState<Dentist[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async () => {
    setLoading(true);
    try {
      const res = await guestClient.get(`${API_URL}/users/dentists`);

      if (res && res.status === 200) {
        setDentists(res.data.dentists);
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

  return { sendRequest, loading, errorMessage, dentists };
};

export default useGetDentistUsers;
