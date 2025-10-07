import * as yup from 'yup';
import { UserRole } from '../../models';

export const options = [
  { label: 'Patient', value: UserRole.Patient },
  { label: 'Client Admin', value: UserRole.ClientAdmin },
  { label: 'Client User', value: UserRole.ClientUser },
  { label: 'Super Admin', value: UserRole.SuperAdmin },
];

const roles = ['patient', 'client_admin', 'client_user', 'super_admin'];

export const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().oneOf(roles, 'Invalid role').required('Role is required'),
});
