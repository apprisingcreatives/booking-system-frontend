import { AppointmentStatus, PaymentStatus, UserRole } from '../../models';

export const getRoleDisplayName = (role: UserRole) => {
  switch (role) {
    case UserRole.ClientAdmin:
      return 'Administrator';
    case UserRole.ClientUser:
      return 'Staff User';
    case UserRole.Patient:
      return 'Patient';
    default:
      return role;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    case 'suspended':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getInvitationStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getAppointmentStatusColor = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Confirmed:
      return 'bg-blue-100 text-blue-800';
    case AppointmentStatus.Completed:
      return 'bg-green-100 text-green-800';
    case AppointmentStatus.Cancelled:
      return 'bg-red-100 text-red-800';
    case AppointmentStatus.Pending:
      return 'bg-yellow-100 text-yellow-800';
    case AppointmentStatus.InProgress:
      return 'bg-purple-100 text-purple-800';
    case AppointmentStatus.NoShow:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Paid:
      return 'bg-green-100 text-green-800';
    case PaymentStatus.Pending:
      return 'bg-yellow-100 text-yellow-800';
    case PaymentStatus.Failed:
      return 'bg-red-100 text-red-800';
    case PaymentStatus.Refunded:
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
