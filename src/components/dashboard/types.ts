export type DashboardAppointment = {
  appointmentDate: Date;
  id: string;
  patient?: string;
  dentist?: {
    name: string;
  };
};
