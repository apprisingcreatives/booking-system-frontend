import { Button } from "../common";
import { formatDateTime } from "../../utils/dateFormatter";
import { useAuth } from "../../hooks";
import { UserRole } from "../../models";

type Props = {
  dentist?: string;
  appointmentDate: Date | string;
  onClickCancel: (id: string) => void;
  id: string;
  onClickReschedule: (id: string) => void;
  patient?: string;
};

const AppointmentCard = ({
  dentist = "",
  appointmentDate,
  onClickCancel,
  id,
  onClickReschedule,
  patient = "",
}: Props) => {
  const { user } = useAuth();

  const { role } = user || {};
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
          onClick={() => onClickReschedule(id)}
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
