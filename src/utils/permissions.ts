import { AppointmentStatus, UserRole } from '../models';

export const canUpdatePatientStatus = (role: UserRole) => {
  return role === UserRole.ClientAdmin || role === UserRole.ClientUser;
};

// Determine which actions are available
export const canCancel = (
  appointmentStatus: AppointmentStatus,
  userRole: UserRole
) => {
  return (
    appointmentStatus !== AppointmentStatus.Cancelled &&
    appointmentStatus !== AppointmentStatus.Completed &&
    (userRole === UserRole.Patient || userRole === UserRole.ClientUser)
  );
};

export const canReschedule = (
  appointmentStatus: AppointmentStatus,
  userRole: UserRole
) => {
  return (
    appointmentStatus !== AppointmentStatus.Cancelled &&
    appointmentStatus !== AppointmentStatus.Completed &&
    (userRole === UserRole.Patient || userRole === UserRole.ClientUser)
  );
};

export const canComplete = (
  appointmentStatus: AppointmentStatus,
  userRole: UserRole
) => {
  return (
    appointmentStatus !== AppointmentStatus.Cancelled &&
    appointmentStatus !== AppointmentStatus.Completed &&
    (userRole === UserRole.ClientAdmin ||
      userRole === UserRole.ClientUser ||
      userRole === UserRole.Chiropractor)
  );
};

export const isClientUser = (userRole: UserRole) => {
  return userRole === UserRole.ClientAdmin || userRole === UserRole.ClientUser;
};
