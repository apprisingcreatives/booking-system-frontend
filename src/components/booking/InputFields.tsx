import { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { services } from './constants';
import SelectInput from '../common/input/SelectInput';
import InputLabel from '../common/input/InputLabel';
import TimeSelectInput from '../common/input/TimeSelectInput';
import { useGetFacilityAppointments } from '../../hooks';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dentists: any[];
};

const InputFields = ({ dentists }: Props) => {
  const { sendRequest, appointments } = useGetFacilityAppointments();
  const { values } = useFormikContext<{
    dentistId: string;
    appointmentDate: string;
    time: string;
    reason: string;
  }>();
  const appointmentDates = useMemo(() => {
    return appointments?.map((appointment) => appointment.appointmentDate);
  }, [appointments]);
  const options = useMemo(() => {
    if (!Array.isArray(dentists)) return [];
    return dentists.map((dentist) => ({
      label: `Dr. ${dentist.name}`,
      value: dentist._id,
    }));
  }, [dentists]);

  const bookedTimesForDate = useMemo(() => {
    if (!values.appointmentDate) return [];

    return (
      appointmentDates
        ?.filter((appt) => {
          const apptDate = new Date(appt);
          const datePart = apptDate.toISOString().split('T')[0];
          return datePart === values.appointmentDate;
        })
        .map((appt) => {
          const apptDate = new Date(appt);
          return apptDate.toTimeString().slice(0, 5);
        }) || []
    );
  }, [appointmentDates, values.appointmentDate]);

  const onDentistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dentistId = e.target.value;
    if (dentistId) {
      sendRequest(dentistId);
    }
  };

  return (
    <>
      <SelectInput
        label='Select Dentist'
        options={options}
        name='dentistId'
        onChange={onDentistChange}
      />
      <SelectInput label='Reason' options={services} name='reason' />
      <div className='flex justify-between gap-4'>
        <InputLabel
          id='appointmentDate'
          label='Select Date'
          name='appointmentDate'
          type='date'
          className='flex-1'
          minDateToday
        />
        <TimeSelectInput
          name='time'
          label='Select Time'
          id='time'
          bookedTimes={bookedTimesForDate}
          className='flex-1'
        />
      </div>
    </>
  );
};

export default InputFields;
