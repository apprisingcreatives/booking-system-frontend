import { useState } from 'react';
import { Input, Modal } from '../common';
import { useCreatePatient, useSnackbar } from '../../hooks';
import { SnackbarType } from '../../constants/snackbar';
import Button from '../common/Button';

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

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    sendRequest({
      facilityId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || undefined,
      password: formData.password,
      onSuccess: (message) => {
        snackbar(message, SnackbarType.SUCCESS, true, 3000);
        onPatientAdded();
        handleClose();
      },
      onError: (message) => {
        snackbar(message, SnackbarType.ERROR, true, 5000);
      },
    });
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Add New Patient'
      size='md'
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Full Name */}
        {/* <div> */}
        {/* <label
            htmlFor='fullName'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Full Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
            placeholder='John Doe'
            disabled={loading}
          />
          {errors.fullName && (
            <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>
          )}
        </div> */}
        <Input
          label='Full Name'
          required
          id='fullName'
          name='fullName'
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
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
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          disabled={loading}
          placeholder='john@example.com'
        />

        {/* Phone */}
        <Input
          label='Phone (Optional)'
          required
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          disabled={loading}
          type='tel'
          placeholder='+1234567890'
        />

        {/* Password */}
        <Input
          label='Password'
          required
          id='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          disabled={loading}
          type='password'
          placeholder='••••••••'
        />

        {/* Confirm Password */}
        <Input
          label='Confirm Password'
          required
          id='confirmPassword'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          disabled={loading}
          type='password'
          placeholder='••••••••'
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
