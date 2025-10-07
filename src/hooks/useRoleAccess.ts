import { UserRole } from '../models/user';
import useAuth from './useAuth';

export interface RolePermissions {
  canManageFacilities: boolean;
  canManageStaff: boolean;
  canManagePatients: boolean;
  canManageAppointments: boolean;
  canManageServices: boolean;
  canViewAllAppointments: boolean;
  canViewAllPatients: boolean;
  canInviteUsers: boolean;
  canAccessFacility: (facilityId: string) => boolean;
  canAccessPatient: (patientId: string) => boolean;
}

export const useRoleAccess = (): RolePermissions => {
  const { user } = useAuth();

  if (!user) {
    return {
      canManageFacilities: false,
      canManageStaff: false,
      canManagePatients: false,
      canManageAppointments: false,
      canManageServices: false,
      canViewAllAppointments: false,
      canViewAllPatients: false,
      canInviteUsers: false,
      canAccessFacility: () => false,
      canAccessPatient: () => false,
    };
  }

  const { role, facilityId, _id: userId } = user;

  const permissions: RolePermissions = {
    // Super admin can do everything
    canManageFacilities: role === UserRole.SuperAdmin,
    canManageStaff: role === UserRole.ClientAdmin,
    canManagePatients:
      role === UserRole.ClientAdmin || role === UserRole.ClientUser,
    canManageAppointments:
      role === UserRole.ClientAdmin || role === UserRole.ClientUser,
    canManageServices: role === UserRole.ClientAdmin,
    canViewAllAppointments:
      role === UserRole.ClientAdmin || role === UserRole.ClientUser,
    canViewAllPatients:
      role === UserRole.ClientAdmin || role === UserRole.ClientUser,
    canInviteUsers:
      role === UserRole.SuperAdmin || role === UserRole.ClientAdmin,

    // Facility access control
    canAccessFacility: (facilityIdToCheck: string) => {
      if (role === UserRole.SuperAdmin) return true;
      return facilityId === facilityIdToCheck;
    },

    // Patient access control
    canAccessPatient: (patientIdToCheck: string) => {
      if (role === UserRole.ClientAdmin || role === UserRole.ClientUser) {
        return true;
      }
      return userId === patientIdToCheck;
    },
  };

  return permissions;
};

export default useRoleAccess;
