import * as yup from 'yup';

export const rescheduleSchema = yup.object({
  appointmentDate: yup.date().required('Please select an appointment date'),
  time: yup
    .string()
    .required('Please select time slot')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
});

export const formikInitialValues = {
  appointmentDate: '',
  time: '',
};

export const menuLinks = [
  {
    label: 'Manage users',
    link: '/admin/manage-users',
    description: 'View, add, and update user accounts, roles, and permissions.',
  },
  {
    label: 'Manage facilities',
    link: '/admin/manage-facilities',
    description:
      'Oversee facility records, onboarding, and operational details.',
  },
];
