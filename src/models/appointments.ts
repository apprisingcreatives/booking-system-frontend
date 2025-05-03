import { Dentist, User } from "./user";

export interface Appointment {
  patient: User;
  dentist: Dentist;
  appointmentDate: Date;
  reason: string;
  createdAt: Date;
  status: string;
  _id: string;
}
