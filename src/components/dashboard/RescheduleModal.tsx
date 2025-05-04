import { memo } from "react";
import { DentistAppointment } from "../../hooks/useGetDentistAppointments";
import { Modal, ModalContent } from "../common";
import RescheduleForm from "./RescheduleForm";
import { DashboardAppointment } from "./types";

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  refetchAppointments: () => void;
  appointment: DashboardAppointment | null;
  appointmentDates: DentistAppointment[] | null;
};
const RescheduleModal = ({
  open,
  handleClose,
  title,
  appointmentDates,
  appointment,
  refetchAppointments,
}: Props) => {
  return (
    <Modal open={open} title={title} toggle={handleClose}>
      <ModalContent>
        <RescheduleForm
          appointmentDates={appointmentDates}
          onCancelReschedule={handleClose}
          appointment={appointment}
          refetchAppointments={refetchAppointments}
        />
      </ModalContent>
    </Modal>
  );
};

export default memo(RescheduleModal);
