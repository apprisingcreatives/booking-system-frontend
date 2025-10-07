import { useState } from "react";
import { AxiosError } from "axios";
import authClient from "../services/authClient";
import { API_URL } from "../constants/api";
import { Facility } from "../models/user";

type CreateFacilityParams = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  onSuccess: (facility: Facility, message: string) => void;
  onError: (message: string) => void;
};

const useCreateFacility = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createFacility = async ({
    name,
    email,
    phoneNumber,
    address,
    onSuccess,
    onError,
  }: CreateFacilityParams) => {
    setLoading(true);
    setErrorMessage("");

    const params = {
      name,
      email,
      phoneNumber,
      address,
      isActive: true,
    };

    try {
      const res = await authClient.post(`${API_URL}/facilities`, params);

      if (res && res.status === 201) {
        const facility = res.data.data.facility;
        onSuccess(facility, "Facility created successfully");
      } else {
        const message = res.data?.message || "Failed to create facility";
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

  return { createFacility, loading, errorMessage };
};

export default useCreateFacility;
