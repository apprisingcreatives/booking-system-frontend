// src/hooks/usePostCreateChiropractor.ts
import { useState } from 'react';
import axios from 'axios';
import { ApiErrorResponse } from '../models/common/apiResponse';
import { Chiropractor } from '../models';

interface ChiropractorPayload {
  userId: string;
  name: string;
  specialization: string;
  bio: string;
  email: string;
  phone?: string;
  imageUrl?: string;
}

interface UsePostCreateChiropractorReturn {
  loading: boolean;
  errorMessage: string | null;
  success: boolean;
  createdChiropractor: Chiropractor | null;
  sendRequest: (
    facilityId: string,
    payload: ChiropractorPayload
  ) => Promise<void>;
}

/**
 * Hook to create a chiropractor under a specific facility.
 * Only SuperAdmin or ClientAdmin can perform this action.
 */
export const usePostCreateChiropractor =
  (): UsePostCreateChiropractorReturn => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [createdChiropractor, setCreatedChiropractor] =
      useState<Chiropractor | null>(null);

    const sendRequest = async (
      facilityId: string,
      payload: ChiropractorPayload
    ) => {
      setLoading(true);
      setErrorMessage(null);
      setSuccess(false);
      setCreatedChiropractor(null);

      try {
        const response = await axios.post(
          `/api/facilities/${facilityId}/chiropractors`,
          payload,
          { withCredentials: true }
        );

        setCreatedChiropractor(response.data.data.chiropractor);
        setSuccess(true);
      } catch (error) {
        console.error('Error creating chiropractor:', error);
        const err = error as ApiErrorResponse;
        setErrorMessage(
          err.data?.message ||
            'Failed to create chiropractor. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    return { loading, errorMessage, success, createdChiropractor, sendRequest };
  };

export default usePostCreateChiropractor;
