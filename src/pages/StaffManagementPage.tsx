import React from 'react';
import { Users, ArrowLeft, UserPlus, Settings, Shield } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth, useRoleAccess } from '../hooks';

const StaffManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { facilityId } = useParams<{ facilityId: string }>();
  const { user } = useAuth();
  const { canManageStaff } = useRoleAccess();

  if (!canManageStaff) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='text-center'>
              <Users className='mx-auto h-12 w-12 text-gray-400' />
              <h2 className='mt-4 text-lg font-medium text-gray-900'>
                Access Denied
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                You don't have permission to manage staff.
              </p>
              <div className='mt-6'>
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant='outline'
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            variant='ghost'
            onClick={() => navigate('/dashboard')}
            leftIcon={<ArrowLeft className='h-4 w-4' />}
            className='mb-4'
          >
            Back to Dashboard
          </Button>
          <div className='text-center'>
            <Users className='mx-auto h-16 w-16 text-blue-600' />
            <h1 className='mt-4 text-4xl font-extrabold text-gray-900'>
              Staff Management
            </h1>
            <p className='mt-4 text-lg text-gray-600 max-w-2xl mx-auto'>
              Advanced staff management tools are coming soon. You'll be able to
              manage all staff members, roles, and permissions for your
              facility.
            </p>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 text-center mb-8'>
            What's Coming
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='text-center p-6 bg-blue-50 rounded-lg'>
              <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <UserPlus className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Staff Invitations
              </h3>
              <p className='text-sm text-gray-600'>
                Send invitations to new staff members with role-based access
                controls.
              </p>
            </div>

            <div className='text-center p-6 bg-green-50 rounded-lg'>
              <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Settings className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Role Management
              </h3>
              <p className='text-sm text-gray-600'>
                Assign and modify staff roles with granular permission controls.
              </p>
            </div>

            <div className='text-center p-6 bg-purple-50 rounded-lg'>
              <div className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Shield className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Access Control
              </h3>
              <p className='text-sm text-gray-600'>
                Manage staff access to different areas and features of the
                platform.
              </p>
            </div>
          </div>
        </div>

        {/* Staff Overview */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
              <Users className='h-5 w-5 mr-2 text-blue-600' />
              Staff Roles
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm font-medium text-gray-900'>
                  Client Admin
                </span>
                <span className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                  Full Access
                </span>
              </div>
              <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm font-medium text-gray-900'>
                  Client User
                </span>
                <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full'>
                  Limited Access
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Current Facility
            </h3>
            {user?.facilityId ? (
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
                  <span className='text-white font-medium'>
                    {user.fullName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Facility ID: {user?.facilityId as string}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Staff will be managed for this facility
                  </p>
                </div>
              </div>
            ) : (
              <p className='text-sm text-gray-500'>No facility assigned</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='text-center'>
          <div className='space-x-4'>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
            <Button
              variant='outline'
              onClick={() => navigate(`/facilities/${facilityId}/manage-users`)}
            >
              Manage Users (Current)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagementPage;
