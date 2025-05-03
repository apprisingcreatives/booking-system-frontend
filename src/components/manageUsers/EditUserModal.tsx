import { User } from "../../models";
import { Modal, ModalContent } from "../common";
import EditUserForm from "./EditUserForm";

type Props = {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  refetchUsers: () => void;
};

const EditUserModal = ({ open, handleClose, user, refetchUsers }: Props) => {
  if (!user) return null;
  return (
    <Modal title="Edit User" open={open} toggle={handleClose}>
      <ModalContent>
        <EditUserForm
          user={user}
          handleClose={handleClose}
          refetchUsers={refetchUsers}
        />
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
