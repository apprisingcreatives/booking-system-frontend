export enum UserRole {
  Patient = 'patient',
  ClientAdmin = 'client_admin',
  ClientUser = 'client_user',
  SuperAdmin = 'super_admin',
  Chiropractor = 'chiropractor',
}

export enum UserStatus {
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended',
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  facilityId?: string | Facility;
  status: UserStatus;
  avatarUrl?: string;
  image?: string;
  appointments: string[];
  createdAt: Date;
  updatedAt: Date;
  changedPasswordAfter?(JWTTimestamp: number): boolean;
  passwordChangedAt?: Date | number;
  correctPassword?(candidatePassword: string, userPassword: string): boolean;
  passwordConfirm?: string;
}

export interface Facility {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
  facilityId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chiropractor {
  _id: string;
  userId: string;
  name: string;
  specialization: string;
  bio: string;
  imageUrl?: string;
  isActive: boolean;
  email: string;
  phone?: string;
  facilityId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    fullName: string;
    email: string;
    phone?: string;
  };
}

export interface Invitation {
  _id: string;
  email: string;
  role: UserRole;
  facilityId: { name: string; _id: string };
  invitedBy: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  facility?: {
    name: string;
  };
  inviter?: {
    fullName: string;
    email: string;
  };
}

export interface Patient {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
