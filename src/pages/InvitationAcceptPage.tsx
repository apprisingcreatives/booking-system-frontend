import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, User, CheckCircle, AlertCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

import { SeverityType } from '../constants/snackbar';
import { useAcceptInvitation, useGetInvitation, useSnackbar } from '../hooks';

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) return;

    await acceptInvitation({
      token,
      fullName: formData.fullName,
      password: formData.password,
      phone: formData.phone || undefined,
      onSuccess: (message) => {
        snackbar(message, SeverityType.SUCCESS, true);
        setAccepted(true);
      },
      onError: (message) => {
        snackbar(message, SeverityType.ERROR, true);
      },
    });
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (invitationLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
              <p className='mt-4 text-sm text-gray-600'>
                Loading invitation...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (invitationError || !invitation) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='text-center'>
              <AlertCircle className='mx-auto h-12 w-12 text-red-500' />
              <h2 className='mt-4 text-lg font-medium text-gray-900'>
                Invalid Invitation
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                {invitationError ||
                  'This invitation link is invalid or has expired.'}
              </p>
              <div className='mt-6'>
                <Button onClick={() => navigate('/')} variant='outline'>
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='text-center'>
              <CheckCircle className='mx-auto h-12 w-12 text-green-500' />
              <h2 className='mt-4 text-lg font-medium text-gray-900'>
                Account Created Successfully!
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                Your account has been set up. You can now log in to access the
                platform.
              </p>
              <div className='mt-6'>
                <Button onClick={handleGoToLogin} size='lg' fullWidth>
                  Go to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'client_admin':
        return 'Client Administrator';
      case 'client_user':
        return 'Client User';
      case 'super_admin':
        return 'Super Administrator';
      default:
        return role;
    }
  };

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
              {invitation.facility?.name}
            </span>
          </p>
        </div>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {/* Invitation Details */}
          <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md'>
            <div className='flex items-start'>
              <User className='flex-shrink-0 h-5 w-5 text-blue-400 mt-0.5' />
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-blue-800'>
                  Invitation Details
                </h3>
                <div className='mt-2 text-sm text-blue-700'>
                  <p>
                    <strong>Email:</strong> {invitation.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {getRoleDisplayName(invitation.role)}
                  </p>
                  <p>
                    <strong>Facility:</strong> {invitation.facility?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

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

          <div className='mt-6 text-center'>
            <p className='text-xs text-gray-500'>
              By creating an account, you agree to our terms of service and
              privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationAcceptPage;
