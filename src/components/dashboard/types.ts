export type DashboardAppointment = {
  appointmentDate: Date | string;
  id: string;
  patient?: string;
  dentist?: {
    name?: string;
    _id?: string;
  };
};
