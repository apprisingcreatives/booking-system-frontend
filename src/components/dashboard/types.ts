export type DashboardAppointment = {
  appointmentDate: Date | string;
  id: string;
  patient?: string;
  chiropractor?: {
    name?: string;
    _id?: string;
  };
  facilityId?: string;
};
