import { Appointment } from "./appointments";

export enum UserRole {
  Patient = "patient",
  Admin = "admin",
  Dentist = "dentist",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  appointments: string[];
  createdAt: Date;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  passwordChangedAt: Date | number;
  correctPassword(candidatePassword: string, userPassword: string): boolean;
  passwordConfirm: string;
  hasDentistProfile?: boolean;
}

export interface Dentist {
  name: string;
  email: string;
  specialization: string;
  phone: string;
  appointments: Appointment[];
  _id: string;
}
