/**
 * Utility functions for navigating to the appointments calendar page
 * based on user role
 */

import { UserRole } from '../models/user';

/**
 * Get the appointments page URL based on user role and IDs
 * @param role - User's role
 * @param userId - User's ID (for patients)
 * @param facilityId - Facility ID (for facility users)
 * @returns The appropriate appointments page URL
 */
export const getAppointmentsUrl = (
  role: UserRole,
  userId?: string,
  facilityId?: string
): string => {
  switch (role) {
    case UserRole.Patient:
      return `/patients/${userId}/appointments`;
    case UserRole.ClientAdmin:
    case UserRole.ClientUser:
      return `/facilities/${facilityId}/appointments`;
    case UserRole.Chiropractor:
      return '/chiropractor/appointments';
    case UserRole.SuperAdmin:
      // Super admin could see all facilities, might need a facility selector
      return facilityId
        ? `/facilities/${facilityId}/appointments`
        : '/admin/manage-facilities'; // Redirect to select a facility
    default:
      return '/dashboard';
  }
};

/**
 * Check if user has access to appointments calendar
 * @param role - User's role
 * @returns boolean indicating if user can access appointments calendar
 */
export const canAccessAppointmentsCalendar = (role?: UserRole): boolean => {
  if (!role) return false;

  return [
    UserRole.Patient,
    UserRole.ClientAdmin,
    UserRole.ClientUser,
    UserRole.Chiropractor,
    UserRole.SuperAdmin,
  ].includes(role);
};

/**
 * Get a user-friendly label for the appointments page navigation
 * @param role - User's role
 * @returns Appropriate label for the role
 */
export const getAppointmentsLabel = (role?: UserRole): string => {
  switch (role) {
    case UserRole.Patient:
      return 'My Appointments';
    case UserRole.Chiropractor:
      return 'My Schedule';
    case UserRole.ClientAdmin:
    case UserRole.ClientUser:
      return 'Appointments Calendar';
    case UserRole.SuperAdmin:
      return 'Facility Appointments';
    default:
      return 'Appointments';
  }
};
