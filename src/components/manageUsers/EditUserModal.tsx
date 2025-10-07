import { User } from '../../models';
import { Modal } from '../common';
import ModalContent from '../common/modal/ModalContent';
import EditUserForm from './EditUserForm';

type Props = {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  refetchUsers: () => void;
};

const EditUserModal = ({ open, handleClose, user, refetchUsers }: Props) => {
  if (!user) return null;
  return (
    <Modal title='Edit User' isOpen={open} onClose={handleClose}>
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
