import { useMemo, useState } from 'react';
import InputLabel from '../common/input/InputLabel';
import SelectInput from '../common/input/SelectInput';
import { useFormikContext } from 'formik';
import {
  useAuth,
  useGetAppointments,
  useGetChiropractorAppointments,
} from '../../hooks';
import TimeSlotModal from './TimeSlotModal';
import { useUserFacilities } from '../../hooks/useUserFacilities';
import { Input } from '../common';
import { AppointmentStatus, Chiropractor, Patient } from '../../models';
import { isClientUser } from '../../utils/permissions';

type Props = {
  chiropractors: Chiropractor[];
  patients: Patient[];
};

const InputFields = ({ chiropractors, patients }: Props) => {
  const { user } = useAuth();
  const { role } = user || {};
  const { services } = useUserFacilities();

  const { sendRequest: sendRequestAppointments } = useGetAppointments();
  const patientsOptions = useMemo(() => {
    return patients?.map((patient) => ({
      label: patient.fullName,
      value: patient.userId,
    }));
  }, [patients]);

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patientId = e.target.value;
    if (patientId) {
      sendRequestAppointments({ patientId });
    }
  };

  const { sendRequest, appointments } = useGetChiropractorAppointments();

  const { values, setFieldValue } = useFormikContext<{
    chiropractorId: string;
    appointmentDate: string;
    time: string;
    serviceId: string;
    notes?: string;
    patientId?: string;
  }>();

  const servicesOptions = useMemo(() => {
    return services.map((service) => ({
      label: service.name,
      value: service._id,
    }));
  }, [services]);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  // Filter booked times based on appointments with Pending or Confirmed status only
  const bookedTimesForDate = useMemo(() => {
    if (!values.appointmentDate || !appointments) return [];

    return appointments
      .filter((appt) => {
        // Only consider Pending or Confirmed appointments as blocking
        const isBlockingStatus =
          appt.status === AppointmentStatus.Pending ||
          appt.status === AppointmentStatus.Confirmed;

        if (!isBlockingStatus) return false;

        // Check if appointment is on the selected date
        const apptDate = new Date(appt.appointmentDate);
        const apptDateString = apptDate.toISOString().split('T')[0];
        return apptDateString === values.appointmentDate;
      })
      .map((appt) => {
        // Normalize time to HH:mm format
        const timeString = appt.appointmentTime;

        // Handle 12-hour format (e.g., "2:00:00 PM") by converting to 24-hour format
        if (timeString.includes('AM') || timeString.includes('PM')) {
          const isPM = timeString.includes('PM');
          const timeWithoutPeriod = timeString.replace(/\s?(AM|PM)/i, '');
          const [h, m] = timeWithoutPeriod.split(':');
          let hours = parseInt(h);
          const minutes = parseInt(m);

          // Convert to 24-hour format
          if (isPM && hours !== 12) {
            hours += 12;
          } else if (!isPM && hours === 12) {
            hours = 0;
          }

          return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`;
        }

        // Already in 24-hour format (e.g., "14:00"), just return it
        return timeString;
      });
  }, [appointments, values.appointmentDate]);

  const options = chiropractors.map((chiro) => ({
    label: `Dr. ${chiro.name}`,
    value: chiro._id,
  }));

  const handleSelectTime = (time: string) => {
    setFieldValue('time', time);
    setIsTimeModalOpen(false);
  };

  const handleChiropractorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const chiropractorId = e.target.value;

    if (chiropractorId) {
      sendRequest(chiropractorId);
    }
  };

  return (
    <>
      {role && isClientUser(role) && (
        <SelectInput
          label='Select Patient'
          options={patientsOptions}
          name='patientId'
          onChange={handlePatientChange}
        />
      )}
      <SelectInput
        label='Select Chiropractor'
        options={options}
        name='chiropractorId'
        onChange={handleChiropractorChange}
      />
      <SelectInput label='Service' options={servicesOptions} name='serviceId' />
      <Input
        type='textarea'
        label='Notes'
        name='notes'
        placeholder='Enter notes'
        id='notes'
        value={values.notes}
        onChange={(e) => setFieldValue('notes', e.target.value)}
      />
      <div className='flex justify-between gap-4'>
        <InputLabel
          id='appointmentDate'
          label='Select Date'
          name='appointmentDate'
          type='date'
          className='flex-1'
          minDateToday
        />
        <div className='flex flex-col gap-y-1 flex-1'>
          <label className='block font-medium text-gray-700'>Select Time</label>
          <button
            type='button'
            onClick={() => setIsTimeModalOpen(true)}
            className='p-2 border rounded w-full text-left bg-white hover:bg-gray-50 transition'
            disabled={!values.appointmentDate}
          >
            {values.time ? values.time : 'Choose Time'}
          </button>
        </div>
      </div>

      <TimeSlotModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        bookedTimes={bookedTimesForDate}
        onSelect={handleSelectTime}
      />
    </>
  );
};

export default InputFields;
