/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';

import {
  PaymentRequest,
  PaymentResponse,
  Payment,
  PaymentMethodOption,
} from '../models';
import authClient from '../services/authClient';

interface UsePaymentResult {
  sendRequest: (data: PaymentRequest) => Promise<PaymentResponse>;
  loading: boolean;
  errorMessage: string | null;
}

export const usePayment = (): UsePaymentResult => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (data: PaymentRequest): Promise<PaymentResponse> => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const response = await authClient.post('/payments', data);
        return response.data;
      } catch (error: any) {
        const message = error.response?.data?.message || 'Payment failed';
        setErrorMessage(message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { sendRequest, loading, errorMessage };
};

interface UsePaymentMethodsResult {
  sendRequest: () => Promise<PaymentMethodOption[]>;
  loading: boolean;
  errorMessage: string | null;
  paymentMethods: PaymentMethodOption[] | null;
}

export const usePaymentMethods = (): UsePaymentMethodsResult => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodOption[] | null
  >(null);

  const sendRequest = useCallback(async (): Promise<PaymentMethodOption[]> => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await authClient.get('/payments/methods');
      setPaymentMethods(response.data.data);
      return response.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Failed to fetch payment methods';
      setErrorMessage(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendRequest, loading, errorMessage, paymentMethods };
};

interface UsePaymentStatusResult {
  sendRequest: (paymentId: string) => Promise<Payment>;
  loading: boolean;
  errorMessage: string | null;
}

export const usePaymentStatus = (): UsePaymentStatusResult => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (paymentId: string): Promise<Payment> => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const response = await authClient.get(`/payments/${paymentId}`);
        return response.data.data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || 'Failed to fetch payment status';
        setErrorMessage(message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { sendRequest, loading, errorMessage };
};

interface UseAllPaymentsResult {
  sendRequest: () => Promise<Payment[]>;
  loading: boolean;
  errorMessage: string | null;
  payments: Payment[] | null;
}

export const useAllPayments = (): UseAllPaymentsResult => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payments, setPayments] = useState<Payment[] | null>(null);

  const sendRequest = useCallback(async (): Promise<Payment[]> => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await authClient.get('/payments');
      setPayments(response.data.data);
      return response.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Failed to fetch payments';
      setErrorMessage(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendRequest, loading, errorMessage, payments };
};
