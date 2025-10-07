import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, CheckCircle } from 'lucide-react';
import Modal from '../common/Modal';
import FormStep from '../common/FormStep';
import StepIndicator from '../common/StepIndicator';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import useCreateFacility from '../../hooks/useCreateFacility';
import useSendInvitation from '../../hooks/useSendInvitation';
import useSnackbar from '../../hooks/useSnackbar';
import { UserRole } from '../../models/user';
import { SeverityType } from '../../constants/snackbar';

interface FacilityData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface InvitationData {
  email: string;
  role: UserRole;
}

interface FacilityOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { title: 'Facility Details', description: 'Basic information' },
  { title: 'Admin Invitation', description: 'Invite facility admin' },
  { title: 'Complete', description: 'Setup complete' },
];

const FacilityOnboardingModal: React.FC<FacilityOnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { snackbar } = useSnackbar();
  const { createFacility, loading: facilityLoading } = useCreateFacility();
  const { sendInvitation, loading: invitationLoading } = useSendInvitation();

  const [currentStep, setCurrentStep] = useState(0);
  const [facilityData, setFacilityData] = useState<FacilityData>({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [invitationData, setInvitationData] = useState<InvitationData>({
    email: '',
    role: UserRole.ClientAdmin,
  });
  const [createdFacilityId, setCreatedFacilityId] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFacilityData = () => {
    const newErrors: Record<string, string> = {};

    if (!facilityData.name.trim()) {
      newErrors.name = 'Facility name is required';
    }
    if (!facilityData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(facilityData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!facilityData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!facilityData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateInvitationData = () => {
    const newErrors: Record<string, string> = {};

    if (!invitationData.email.trim()) {
      newErrors.invitationEmail = 'Admin email is required';
    } else if (!/\S+@\S+\.\S+/.test(invitationData.email)) {
      newErrors.invitationEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFacilitySubmit = async () => {
    if (!validateFacilityData()) return;

    await createFacility({
      ...facilityData,
      onSuccess: (facility, message) => {
        setCreatedFacilityId(facility._id);
        snackbar(message, SeverityType.SUCCESS, true);
        setCurrentStep(1);
      },
      onError: (message) => {
        snackbar(message, SeverityType.ERROR, true);
      },
    });
  };

  const handleInvitationSubmit = async () => {
    if (!validateInvitationData() || !createdFacilityId) return;

    await sendInvitation({
      facilityId: createdFacilityId,
      email: invitationData.email,
      role: invitationData.role,
      onSuccess: (message) => {
        snackbar(message, SeverityType.SUCCESS, true);
        setCurrentStep(2);
      },
      onError: (message) => {
        snackbar(message, SeverityType.ERROR, true);
      },
    });
  };

  const handleClose = () => {
    setCurrentStep(0);
    setFacilityData({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
    });
    setInvitationData({
      email: '',
      role: UserRole.ClientAdmin,
    });
    setCreatedFacilityId('');
    setErrors({});
    onClose();
  };

  const handleComplete = () => {
    handleClose();
    navigate('/facilities');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormStep
            title='Create New Facility'
            description='Enter the basic information for the new facility'
          >
            <Input
              label='Facility Name'
              value={facilityData.name}
              onChange={(e) =>
                setFacilityData({ ...facilityData, name: e.target.value })
              }
              error={errors.name}
              required
              placeholder='Enter facility name'
            />
            <Input
              label='Email'
              type='email'
              value={facilityData.email}
              onChange={(e) =>
                setFacilityData({ ...facilityData, email: e.target.value })
              }
              error={errors.email}
              required
              placeholder='facility@example.com'
            />
            <Input
              label='Phone Number'
              value={facilityData.phoneNumber}
              onChange={(e) =>
                setFacilityData({
                  ...facilityData,
                  phoneNumber: e.target.value,
                })
              }
              error={errors.phoneNumber}
              required
              placeholder='(555) 123-4567'
            />
            <Input
              label='Address'
              value={facilityData.address}
              onChange={(e) =>
                setFacilityData({ ...facilityData, address: e.target.value })
              }
              error={errors.address}
              required
              placeholder='123 Main St, City, State 12345'
            />
            <div className='flex justify-end space-x-3 pt-4'>
              <Button variant='outline' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleFacilitySubmit}
                loading={facilityLoading}
                leftIcon={<Building2 className='h-4 w-4' />}
              >
                Create Facility
              </Button>
            </div>
          </FormStep>
        );

      case 1:
        return (
          <FormStep
            title='Invite Facility Administrator'
            description='Send an invitation to the person who will manage this facility'
          >
            <Input
              label='Administrator Email'
              type='email'
              value={invitationData.email}
              onChange={(e) =>
                setInvitationData({ ...invitationData, email: e.target.value })
              }
              error={errors.invitationEmail}
              required
              placeholder='admin@example.com'
              helperText='This person will receive an email invitation to set up their account'
            />
            <Select
              label='Role'
              value={invitationData.role}
              onChange={(e) =>
                setInvitationData({
                  ...invitationData,
                  role: e.target.value as UserRole,
                })
              }
              options={[
                { value: UserRole.ClientAdmin, label: 'Client Administrator' },
              ]}
              required
              helperText='Client Administrator can manage users and settings for this facility'
            />
            <div className='flex justify-end space-x-3 pt-4'>
              <Button
                variant='outline'
                onClick={() => setCurrentStep(0)}
                disabled={invitationLoading}
              >
                Back
              </Button>
              <Button
                onClick={handleInvitationSubmit}
                loading={invitationLoading}
                leftIcon={<Users className='h-4 w-4' />}
              >
                Send Invitation
              </Button>
            </div>
          </FormStep>
        );

      case 2:
        return (
          <FormStep
            title='Facility Setup Complete!'
            description='The facility has been created and the administrator has been invited'
          >
            <div className='text-center py-8'>
              <CheckCircle className='mx-auto h-16 w-16 text-green-500 mb-4' />
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-medium text-gray-900'>
                    {facilityData.name}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Facility created successfully
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>
                    Invitation sent to{' '}
                    <span className='font-medium'>{invitationData.email}</span>
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    The administrator will receive an email with setup
                    instructions
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-center pt-4'>
              <Button onClick={handleComplete} size='lg'>
                View Facilities
              </Button>
            </div>
          </FormStep>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size='lg'
      closeOnOverlayClick={false}
    >
      <div className='space-y-8'>
        <StepIndicator steps={STEPS} currentStep={currentStep} />
        {renderStepContent()}
      </div>
    </Modal>
  );
};

export default FacilityOnboardingModal;
