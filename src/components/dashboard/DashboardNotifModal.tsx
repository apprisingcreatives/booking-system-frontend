import { useNavigate } from 'react-router-dom';
import { Modal } from '../common';
import ModalContent from '../common/modal/ModalContent';
import Button from '../common/Button';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  userName: string;
};
const DashboardNotifModal = ({ open, handleClose, title, userName }: Props) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/profile/dentist-profile', { replace: true });
  };
  return (
    <Modal isOpen={open} title={title} onClose={handleClose}>
      <ModalContent>
        <div>
          <p className='leading-relaxed'>
            Welcome to SmileCare Dental Dr. {userName}. <br /> Please proceed to
            create your dentist profile to start receiving appointments.
          </p>
          <div className='flex justify-end'>
            <Button onClick={onClick} variant='primary' className=''>
              Click here
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DashboardNotifModal;
