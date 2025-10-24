export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Refunded = 'refunded',
}

export enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
  Insurance = 'insurance',
  Online = 'online',
}

export interface Payment {
  _id: string;
  appointment: string;
  patient: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
}

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface PaymentRequest {
  appointmentId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    transactionId?: string;
    status: PaymentStatus;
    amount: number;
    paymentMethod: PaymentMethod;
  };
}
