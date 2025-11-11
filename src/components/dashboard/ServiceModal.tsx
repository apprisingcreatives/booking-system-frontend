import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import useCreateService from '../../hooks/useCreateService';
import useUpdateService from '../../hooks/useUpdateService';
import useSnackbar from '../../hooks/useSnackbar';
import { SeverityType } from '../../constants/snackbar';
import { useAuth } from '../../hooks';
import { Service } from '../../models/user';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
  onSuccess: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { snackbar } = useSnackbar();
  const { createService, loading: createLoading } = useCreateService();
  const { updateService, loading: updateLoading } = useUpdateService();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    durationMinutes: '',
    price: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!service;
  const loading = createLoading || updateLoading;

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        durationMinutes: service.durationMinutes.toString(),
        price: service.price.toString(),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        durationMinutes: '',
        price: '',
      });
    }
    setErrors({});
  }, [service, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.durationMinutes) {
      newErrors.durationMinutes = 'Duration is required';
    } else if (
      isNaN(Number(formData.durationMinutes)) ||
      Number(formData.durationMinutes) <= 0
    ) {
      newErrors.durationMinutes = 'Duration must be a positive number';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !user?.facilityId) return;

    const serviceData = {
      facilityId: user.facilityId,
      name: formData.name.trim(),
      description: formData.description.trim(),
      durationMinutes: Number(formData.durationMinutes),
      price: Number(formData.price),
      onSuccess: (_savedService: Service, message: string) => {
        snackbar(message, SeverityType.SUCCESS, true);
        handleClose();
        onSuccess();
      },
      onError: (message: string) => {
        snackbar(message, SeverityType.ERROR, true);
      },
    };
    if (isEditing && service) {
      await updateService({
        ...serviceData,
        serviceId: service._id,
        facilityId:
          typeof user.facilityId === 'string'
            ? user.facilityId
            : user.facilityId._id,
      });
    } else {
      await createService({
        ...serviceData,
        facilityId:
          typeof user.facilityId === 'string'
            ? user.facilityId
            : user.facilityId._id,
      });
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      durationMinutes: '',
      price: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Service' : 'Add New Service'}
      size='md'
    >
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Input
          label='Service Name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
          placeholder='e.g., Dental Cleaning'
        />

        <div className='space-y-1'>
          <label className='block text-sm font-medium text-gray-700'>
            Description <span className='text-red-500 ml-1'>*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            placeholder='Describe the service and what it includes...'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 focus:outline-blue-500'
          />
          {errors.description && (
            <p className='text-sm text-red-600'>{errors.description}</p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Input
            label='Duration (minutes)'
            type='number'
            value={formData.durationMinutes}
            onChange={(e) =>
              setFormData({ ...formData, durationMinutes: e.target.value })
            }
            error={errors.durationMinutes}
            required
            placeholder='30'
            min='1'
          />

          <Input
            label='Price ($)'
            type='number'
            step='0.01'
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            error={errors.price}
            required
            placeholder='100.00'
            min='0'
          />
        </div>

        <div className='flex justify-end space-x-3 pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' loading={loading}>
            {isEditing ? 'Update Service' : 'Create Service'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceModal;
