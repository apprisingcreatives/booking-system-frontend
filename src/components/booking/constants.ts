import * as yup from 'yup';

export const bookingsSchema = yup.object({
  chiropractorId: yup.string().required('Please select a chiropractor'),
  appointmentDate: yup.date().required('Please select an appointment date'),
  time: yup
    .string()
    .required('Please select a time slot')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  serviceId: yup.string().required('Please select a service'),
});

export const formikInitialValues = {
  chiropractorId: '',
  appointmentDate: '',
  time: '',
  serviceId: '',
};

export const LEGEND_ITEMS = [
  { label: 'Pending ', bgColor: 'bg-yellow-400', id: 'pending' },
  { label: 'Confirmed ', bgColor: 'bg-blue-500', id: 'confirmed' },
  { label: 'In Progress ', bgColor: 'bg-purple-500', id: 'inProgress' },
  { label: 'Completed ', bgColor: 'bg-green-500', id: 'completed' },
  { label: 'Cancelled ', bgColor: 'bg-red-500', id: 'cancelled' },
  { label: 'No Show ', bgColor: 'bg-gray-500', id: 'noShow' },
];
