import { Modal, ModalContent } from "../common";
import RescheduleForm from "./RescheduleForm";

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  id: string;
  refetchAppointments: () => void;
};
const RescheduleModal = ({
  open,
  handleClose,
  title,
  id,
  refetchAppointments,
}: Props) => {
  return (
    <Modal open={open} title={title} toggle={handleClose}>
      <ModalContent>
        <RescheduleForm
          onCancelReschedule={handleClose}
          id={id}
          refetchAppointments={refetchAppointments}
        />
      </ModalContent>
    </Modal>
  );
};

export default RescheduleModal;
