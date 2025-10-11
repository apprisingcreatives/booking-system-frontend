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
