import { User, Chiropractor, Service, Facility } from './user';

export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
}

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

export interface Appointment {
  id: string;
  patientId: string;
  chiropractorId: string;
  serviceId: string;
  facilityId: string;
  appointmentDate: Date | string;
  appointmentTime: string;
  status: AppointmentStatus;
  notes?: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentAmount: number;
  createdAt: Date;
  updatedAt: Date;
  // Populated fields
  patient?: User;
  chiropractor?: Chiropractor;
  service?: Service;
  facility?: Facility;
}
