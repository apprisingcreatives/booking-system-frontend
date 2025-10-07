import { useState } from "react";
import { AxiosError } from "axios";
import guestClient from "../services/guestClient";
import { API_URL } from "../constants/api";
import { Invitation } from "../models/user";

const useGetInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getInvitation = async (token: string) => {
    setLoading(true);
    setErrorMessage("");
    setInvitation(null);

    try {
      const res = await guestClient.get(`${API_URL}/invitations/${token}`);

      if (res && res.status === 200) {
        setInvitation(res.data.data.invitation);
      } else {
        const message = res.data?.message || "Failed to fetch invitation";
        setErrorMessage(message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "Invalid or expired invitation";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return { getInvitation, invitation, loading, errorMessage };
};

export default useGetInvitation;
