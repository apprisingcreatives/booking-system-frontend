import { PaymentMethod, PaymentStatus } from './payment';
import { User, Chiropractor, Service, Facility, Patient } from './user';

export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
}

export interface Appointment {
  _id: string;
  chiropractorId: string | Partial<Chiropractor>;
  serviceId: string | Partial<Service>;
  facilityId: string | Partial<Facility>;
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
  patientId?: User | Patient;
  chiropractor?: Chiropractor;
  service?: Service;
  facility?: Facility;
}
