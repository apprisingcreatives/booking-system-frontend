import React, { useState, useEffect } from 'react';
import { Modal, Input, ErrorTypography } from '../common';
import Button from '../common/Button';
import { Facility } from '../../models';
import { useSnackbar, useUpdateFacility } from '../../hooks';
import { SeverityType } from '../../constants/snackbar';

interface EditFacilityModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedFacility: Partial<Facility>) => Promise<void> | void;
  fetchFacility: () => void;
}

const EditFacilityModal: React.FC<EditFacilityModalProps> = ({
  facility,
  isOpen,
  onClose,
  fetchFacility,
}) => {
  const [formData, setFormData] = useState<Partial<Facility>>({});
  const { updateFacility, loading, errorMessage } = useUpdateFacility();

  const { snackbar } = useSnackbar();

  useEffect(() => {
    if (facility) {
      setFormData(facility);
    }
  }, [facility]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  const onSuccess = (message: string) => {
    snackbar(message, SeverityType.SUCCESS, true);
    handleClose();
    fetchFacility();
  };

  const onError = (message: string) => {
    snackbar(message, SeverityType.ERROR, true);
  };

  const handleSubmit = async () => {
    updateFacility({
      id: facility?._id || '',
      data: formData,
      onSuccess,
      onError,
    });
  };

  if (!isOpen || !facility) return null;
  return (
    <Modal
      isOpen={isOpen}
      title={`Manage Facility - ${facility.name}`}
      onClose={handleClose}
    >
      {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
      <div className='space-y-4'>
        <Input
          label='Facility Name'
          name='name'
          value={formData.name || ''}
          onChange={handleChange}
        />
        <Input
          label='Email'
          name='email'
          type='email'
          disabled
          value={formData.email || ''}
          onChange={handleChange}
        />
        <Input
          label='Phone Number'
          name='phoneNumber'
          value={formData.phoneNumber || ''}
          onChange={handleChange}
        />
        <Input
          label='Address'
          name='address'
          value={formData.address || ''}
          onChange={handleChange}
        />

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Status
          </label>
          <select
            name='isActive'
            value={formData.isActive ? 'true' : 'false'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isActive: e.target.value === 'true',
              }))
            }
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value='true'>Active</option>
            <option value='false'>Inactive</option>
          </select>
        </div>

        <div className='flex justify-end space-x-2 pt-4'>
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditFacilityModal;
