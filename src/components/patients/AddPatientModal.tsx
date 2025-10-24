import { Input, Modal } from '../common';
import { useCreatePatient, useSnackbar } from '../../hooks';
import { SnackbarType } from '../../constants/snackbar';
import Button from '../common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from '../common/Select';

interface AddPatientModalProps {
  isOpen: boolean;
  facilityId: string;
  onClose: () => void;
  onPatientAdded: () => void;
}

const AddPatientModal = ({
  isOpen,
  facilityId,
  onClose,
  onPatientAdded,
}: AddPatientModalProps) => {
  const { snackbar } = useSnackbar();
  const { loading, sendRequest } = useCreatePatient();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'male',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      dob: Yup.string().required('Date of birth is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      sendRequest({
        facilityId,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        dob: values.dob,
        gender: values.gender || 'male',
        onSuccess: (message) => {
          snackbar(message, SnackbarType.SUCCESS, true, 3000);
          onPatientAdded();
          handleClose();
        },
        onError: (message) => {
          snackbar(message, SnackbarType.ERROR, true, 5000);
        },
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleSelectChange = (value: string) => {
    formik.setFieldValue('gender', value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Add New Patient'
      size='md'
    >
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        {/* Full Name */}

        <Input
          label='Full Name'
          required
          id='fullName'
          name='fullName'
          value={formik.values.fullName}
          onChange={handleInputChange}
          error={
            formik.touched.fullName && formik.errors.fullName
              ? formik.errors.fullName
              : ''
          }
          disabled={loading}
          placeholder='John Doe'
        />

        {/* Email */}
        <Input
          label='Email'
          required
          id='email'
          name='email'
          type='email'
          value={formik.values.email}
          onChange={handleInputChange}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ''
          }
          disabled={loading}
          placeholder='john@example.com'
        />

        {/* Phone */}
        <Input
          label='Phone'
          required
          id='phone'
          name='phone'
          value={formik.values.phone}
          onChange={handleInputChange}
          error={
            formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : ''
          }
          disabled={loading}
          type='tel'
          placeholder='+1234567890'
        />
        <Input
          label='Date of Birth'
          required
          id='dob'
          name='dob'
          value={formik.values.dob}
          onChange={handleInputChange}
          error={
            formik.touched.dob && formik.errors.dob ? formik.errors.dob : ''
          }
          disabled={loading}
          type='date'
          placeholder='+1234567890'
        />
        <Select
          label='Gender'
          required
          id='gender'
          name='gender'
          value={formik.values.gender}
          onChange={(e) => handleSelectChange(e.target.value)}
          error={
            formik.touched.gender && formik.errors.gender
              ? formik.errors.gender
              : ''
          }
          disabled={loading}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        {/* Form Actions */}
        <div className='flex justify-end space-x-3 pt-4 border-t'>
          <button
            type='button'
            onClick={handleClose}
            disabled={loading}
            className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors'
          >
            Cancel
          </button>
          <Button
            type='submit'
            loading={loading}
            disabled={loading}
            className='px-6 py-2'
          >
            Add Patient
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPatientModal;
