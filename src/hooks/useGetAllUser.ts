import { useState } from "react";
import { API_URL } from "../constants/api";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { User } from "../models";

const useGetAllUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async () => {
    setLoading(true);
    try {
      const res = await authClient.get(`${API_URL}/users/all`);

      if (res && res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        "An error occurred while fetching users. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, errorMessage, users };
};

export default useGetAllUsers;
