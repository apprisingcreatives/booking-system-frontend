import React, { useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import useSendInvitation from '../../hooks/useSendInvitation';
import useSnackbar from '../../hooks/useSnackbar';
import { UserRole } from '../../models/user';
import { useAuth } from '../../hooks';
import { SeverityType } from '../../constants/snackbar';
import { getRoleOptions } from './helpers';

interface UserInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UserInvitationModal: React.FC<UserInvitationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { snackbar } = useSnackbar();
  const { sendInvitation, loading } = useSendInvitation();

  const [formData, setFormData] = useState({
    email: '',
    role: UserRole.ClientUser,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { role } = user || {};
  const roleOptions = useMemo(() => {
    if (!role) return [];
    return getRoleOptions(role);
  }, [role]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !user?.facilityId) return;

    await sendInvitation({
      facilityId: user.facilityId as string,
      email: formData.email,
      role: formData.role,
      onSuccess: (message) => {
        snackbar(message, SeverityType.SUCCESS, true);
        handleClose();
        onSuccess?.();
      },
      onError: (message) => {
        snackbar(message, SeverityType.ERROR, true);
      },
    });
  };

  const handleClose = () => {
    setFormData({
      email: '',
      role: UserRole.ClientUser,
    });
    setErrors({});
    onClose();
  };

  const renderRolePermissions = () => {
    if (formData.role === UserRole.ClientAdmin) {
      return (
        <ul className='list-disc list-inside space-y-1'>
          <li>Manage facility users and settings</li>
          <li>View and manage all appointments</li>
          <li>Send user invitations</li>
          <li>Access all facility features</li>
        </ul>
      );
    } else if (formData.role === UserRole.ClientUser) {
      return (
        <ul className='list-disc list-inside space-y-1'>
          <li>Manage patient appointments</li>
          <li>View patient information</li>
          <li>Basic facility access</li>
        </ul>
      );
    }
    return (
      <ul className='list-disc list-inside space-y-1'>
        <li>Manage chiropractor appointments</li>
        <li>View patient information</li>
      </ul>
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title='Invite User' size='md'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-4'>
          <Input
            label='Email Address'
            type='email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            required
            placeholder='user@example.com'
            helperText='The user will receive an email invitation to join your facility'
          />

          <Select
            label='Role'
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value as UserRole })
            }
            options={roleOptions}
            error={errors.role}
            required
            helperText='Select the appropriate role for this user'
          />
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <UserPlus className='h-5 w-5 text-blue-400' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-blue-800'>
                Role Permissions
              </h3>
              <div className='mt-2 text-sm text-blue-700'>
                {renderRolePermissions()}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end space-x-3'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            loading={loading}
            leftIcon={<UserPlus className='h-4 w-4' />}
          >
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserInvitationModal;
