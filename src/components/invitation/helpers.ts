import { UserRole } from '../../models';

export const getRoleOptions = (role: UserRole) => {
  if (role === UserRole.SuperAdmin) {
    return [{ value: UserRole.SuperAdmin, label: 'Apprising Admin' }];
  }
  return [
    { value: UserRole.ClientUser, label: 'Client User' },
    { value: UserRole.ClientAdmin, label: 'Client Administrator' },
    { value: UserRole.Chiropractor, label: 'Chiropractor' },
  ];
};
