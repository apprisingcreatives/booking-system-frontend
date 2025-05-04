import { Button } from "../common";
import { formatDateTime } from "../../utils/dateFormatter";
import { useAuth } from "../../hooks";
import { UserRole } from "../../models";
import { DashboardAppointment } from "./types";

type Props = {
  onClickCancel: (id: string) => void;
  onClickReschedule: (appointment: DashboardAppointment) => void;
  appointment: DashboardAppointment;
};

const AppointmentCard = ({
  onClickCancel,
  onClickReschedule,
  appointment,
}: Props) => {
  const { user } = useAuth();

  const { role } = user || {};

  const {
    appointmentDate,
    patient,
    dentist: dentistObject,
    id: id,
  } = appointment || {};

  const { name: dentist } = dentistObject || {};
  return (
    <li className="p-4 border rounded shadow">
      <p className="font-medium">
        {`${role === UserRole.Dentist ? "" : "Dr."} ${
          dentist || patient
        } - ${formatDateTime({
          date: appointmentDate,
        })}`}
      </p>
      <div className="flex gap-2 mt-2">
        <Button
          className="text-sm text-blue-600"
          size="sm"
          onClick={() => onClickReschedule(appointment)}
        >
          Reschedule
        </Button>
        <Button
          className="text-sm text-red-600"
          variant="secondary"
          size="sm"
          onClick={() => onClickCancel(id)}
        >
          Cancel
        </Button>
      </div>
    </li>
  );
};

export default AppointmentCard;
