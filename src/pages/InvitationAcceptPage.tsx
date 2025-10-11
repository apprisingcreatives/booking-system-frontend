import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, User, CheckCircle, AlertCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

import { SeverityType } from '../constants/snackbar';
import { useAcceptInvitation, useGetInvitation, useSnackbar } from '../hooks';
import { UserRole } from '../models';

const InvitationAcceptPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { snackbar } = useSnackbar();

  const {
    getInvitation,
    invitation,
    loading: invitationLoading,
    errorMessage: invitationError,
  } = useGetInvitation();
  const { acceptInvitation, loading: acceptLoading } = useAcceptInvitation();

  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // chiropractor-specific fields
    licenseNumber: '',
    specialization: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (token) {
      getInvitation(token);
    }
  }, [token]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Chiropractor-only validations
    if (invitation?.role === 'chiropractor') {
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber =
          'License number is required for chiropractors';
      }
      if (!formData.specialization.trim()) {
        newErrors.specialization =
          'Specialization is required for chiropractors';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      token,
      fullName: formData.fullName,
      password: formData.password,
      phone: formData.phone || undefined,
    };

    if (invitation?.role === UserRole.Chiropractor) {
      payload.licenseNumber = formData.licenseNumber;
      payload.specialization = formData.specialization;
    }

    await acceptInvitation({
      ...payload,
      onSuccess: (message) => {
        snackbar(message, SeverityType.SUCCESS, true);
        setAccepted(true);
      },
      onError: (message) => {
        snackbar(message, SeverityType.ERROR, true);
      },
    });
  };
  console.log(`@@@@@@@@@@formData.specialization`, formData.specialization);
  const handleGoToLogin = () => navigate('/login');

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'client_admin':
        return 'Client Administrator';
      case 'client_user':
        return 'Client User';
      case 'super_admin':
        return 'Super Administrator';
      case 'chiropractor':
        return 'Chiropractor';
      default:
        return role;
    }
  };

  if (invitationLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-sm text-gray-600'>Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (invitationError || !invitation) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white py-8 px-6 shadow sm:rounded-lg sm:max-w-md'>
          <div className='text-center'>
            <AlertCircle className='mx-auto h-12 w-12 text-red-500' />
            <h2 className='mt-4 text-lg font-medium text-gray-900'>
              Invalid Invitation
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              {invitationError || 'This invitation link is invalid or expired.'}
            </p>
            <Button
              onClick={() => navigate('/')}
              variant='outline'
              className='mt-4'
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white py-8 px-6 shadow sm:rounded-lg sm:max-w-md'>
          <div className='text-center'>
            <CheckCircle className='mx-auto h-12 w-12 text-green-500' />
            <h2 className='mt-4 text-lg font-medium text-gray-900'>
              Account Created Successfully!
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              You can now log in to access the platform.
            </p>
            <Button
              onClick={handleGoToLogin}
              size='lg'
              fullWidth
              className='mt-6'
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='text-center'>
          <Building2 className='mx-auto h-12 w-12 text-blue-600' />
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Complete Your Account Setup
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            You've been invited to join{' '}
            <span className='font-medium text-blue-600'>
              {invitation.facilityId.name}
            </span>{' '}
            as a{' '}
            <span className='font-medium'>
              {getRoleDisplayName(invitation.role)}
            </span>
          </p>
        </div>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {/* Invitation Info */}
          <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md'>
            <div className='flex items-start'>
              <User className='h-5 w-5 text-blue-400 mt-0.5' />
              <div className='ml-3 text-sm text-blue-700'>
                <p>
                  <strong>Email:</strong> {invitation.email}
                </p>
                <p>
                  <strong>Facility:</strong> {invitation.facilityId.name}
                </p>
                <p>
                  <strong>Role:</strong> {getRoleDisplayName(invitation.role)}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input
              label='Full Name'
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              error={errors.fullName}
              required
              placeholder='Enter your full name'
            />

            <Input
              label='Phone Number'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder='(555) 123-4567'
              helperText='Optional - for contact purposes'
            />

            {/* Chiropractor fields */}
            {invitation.role === 'chiropractor' && (
              <>
                <Input
                  label='License Number'
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseNumber: e.target.value })
                  }
                  error={errors.licenseNumber}
                  required
                  placeholder='Enter your professional license number'
                />
                <Input
                  label='Specialization'
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  error={errors.specialization}
                  required
                  placeholder='E.g. Sports Injury, Spinal Care'
                />
              </>
            )}

            <Input
              label='Password'
              type='password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              required
              placeholder='Create a secure password'
              helperText='Must be at least 8 characters long'
            />

            <Input
              label='Confirm Password'
              type='password'
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
              required
              placeholder='Confirm your password'
            />

            <Button type='submit' loading={acceptLoading} fullWidth size='lg'>
              Create Account
            </Button>
          </form>

          <p className='mt-6 text-center text-xs text-gray-500'>
            By creating an account, you agree to our terms of service and
            privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitationAcceptPage;
