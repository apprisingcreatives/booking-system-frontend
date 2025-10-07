import { useState } from "react";
import { AxiosError } from "axios";
import guestClient from "../services/guestClient";
import { API_URL } from "../constants/api";

type AcceptInvitationParams = {
  token: string;
  fullName: string;
  password: string;
  phone?: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

const useAcceptInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const acceptInvitation = async ({
    token,
    fullName,
    password,
    phone,
    onSuccess,
    onError,
  }: AcceptInvitationParams) => {
    setLoading(true);
    setErrorMessage("");

    const params = {
      fullName,
      password,
      ...(phone && { phone }),
    };

    try {
      const res = await guestClient.post(
        `${API_URL}/invitations/accept/${token}`,
        params
      );

      if (res && res.status === 201) {
        const { message } = res.data;
        onSuccess(message || "Account created successfully");
      } else {
        const message = res.data?.message || "Failed to accept invitation";
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

  return { acceptInvitation, loading, errorMessage };
};

export default useAcceptInvitation;
