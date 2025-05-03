import { Button } from "../button";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

type Props = {
  open: boolean;
  handleClose: () => void;
  onYesClick: () => void;
  messageContent: string;
  title: string;
  maxSize?: "sm" | "md" | "lg";
  loading: boolean;
};

const ConfirmModal = ({
  open,
  handleClose,
  onYesClick,
  messageContent,
  title,
  maxSize = "sm",
  loading,
}: Props) => {
  return (
    <Modal open={open} title={title} toggle={handleClose} maxSize={maxSize}>
      <ModalContent>
        <p>{messageContent}</p>
        <div className="flex gap-x-4 justify-end items-center mt-4">
          <Button
            variant="primary"
            onClick={onYesClick}
            loading={loading}
            disabled={loading}
          >
            Yes, Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
