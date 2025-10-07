import * as yup from 'yup';

export const bookingsSchema = yup.object({
  dentistId: yup.string().required('Please select a dentist'),
  appointmentDate: yup.date().required('Please select an appointment date'),
  time: yup
    .string()
    .required('Please select time slot')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  reason: yup.string().required('Please select a reason for appointment'),
});

export const selectOptions = [
  { label: 'Dr. Smith', value: 'Dr. Smith' },
  { label: 'Dr. Johnson', value: 'Dr. Johnson' },
];

export const services = [
  { label: 'Service 1', value: 'service1' },
  { label: 'Service 2', value: 'service2' },
  { label: 'Service 3', value: 'service3' },
  { label: 'Service 4', value: 'service4' },
  { label: 'Service 5', value: 'service5' },
];

export const formikInitialValues = {
  chiropractorId: '',
  appointmentDate: '',
  time: '',
  serviceId: '',
};
