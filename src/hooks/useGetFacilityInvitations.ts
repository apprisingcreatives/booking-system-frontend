import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";
import { Invitation } from "../models/user";

const useGetFacilityInvitations = (facilityId: string | null) => {
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchInvitations = async () => {
    if (!facilityId) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await authClient.get(
        `${API_URL}/invitations/${facilityId}/list`
      );

      if (res && res.status === 200) {
        setInvitations(res.data.data.invitations || []);
      } else {
        const message = res.data?.message || "Failed to fetch invitations";
        setErrorMessage(message);
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

  useEffect(() => {
    fetchInvitations();
  }, [facilityId]);

  return { 
    invitations, 
    loading, 
    errorMessage, 
    refetch: fetchInvitations 
  };
};

export default useGetFacilityInvitations;
