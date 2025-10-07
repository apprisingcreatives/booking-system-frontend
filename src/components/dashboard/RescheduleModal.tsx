import { memo } from 'react';
import { DentistAppointment } from '../../hooks/useGetDentistAppointments';
import { Modal } from '../common';
import RescheduleForm from './RescheduleForm';
import { Appointment } from '../../models';
import ModalContent from '../common/modal/ModalContent';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  refetchAppointments: () => void;
  appointment: Appointment | null;
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
    <Modal isOpen={open} title={title} onClose={handleClose}>
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
