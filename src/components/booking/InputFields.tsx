/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import InputLabel from '../common/input/InputLabel';
import SelectInput from '../common/input/SelectInput';
import { useFormikContext } from 'formik';
import { useGetFacilityAppointments } from '../../hooks';

import TimeSlotModal from './TimeSlotModal';
import { useUserFacilities } from '../../hooks/useUserFacilities';

type Props = {
  chiropractors: any[];
};

const InputFields = ({ chiropractors }: Props) => {
  const { services } = useUserFacilities();

  const { sendRequest, appointments } = useGetFacilityAppointments();
  const { values, setFieldValue } = useFormikContext<{
    chiropractorId: string;
    appointmentDate: string;
    time: string;
    serviceId: string;
  }>();
  const servicesOptions = useMemo(() => {
    return services.map((service) => ({
      label: service.name,
      value: service._id,
    }));
  }, [services]);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const appointmentDates = useMemo(
    () => appointments?.map((appt) => appt.appointmentDate) || [],
    [appointments]
  );

  const bookedTimesForDate = useMemo(() => {
    if (!values.appointmentDate) return [];
    return (
      appointmentDates
        .filter((appt) => {
          const apptDate = new Date(appt);
          return (
            apptDate.toISOString().split('T')[0] === values.appointmentDate
          );
        })
        .map((appt) => {
          const date = new Date(appt);
          return date.toTimeString().slice(0, 5);
        }) || []
    );
  }, [appointmentDates, values.appointmentDate]);

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
      <SelectInput
        label='Select Chiropractor'
        options={options}
        name='chiropractorId'
        onChange={handleChiropractorChange}
      />
      <SelectInput label='Service' options={servicesOptions} name='serviceId' />

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
