import React, { useState } from 'react';
import { Plus, Building2, Users, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import FacilityOnboardingModal from '../components/facility/FacilityOnboardingModal';
import { useRoleAccess } from '../hooks/useRoleAccess';

const FacilityOnboardingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { canManageFacilities } = useRoleAccess();

  if (!canManageFacilities) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='text-center'>
              <Building2 className='mx-auto h-12 w-12 text-gray-400' />
              <h2 className='mt-4 text-lg font-medium text-gray-900'>
                Access Denied
              </h2>
              <p className='mt-2 text-sm text-gray-600'>
                You don't have permission to access facility onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <Building2 className='mx-auto h-16 w-16 text-blue-600' />
          <h1 className='mt-4 text-4xl font-extrabold text-gray-900'>
            Facility Onboarding
          </h1>
          <p className='mt-4 text-lg text-gray-600 max-w-2xl mx-auto'>
            Set up new facilities and invite administrators to manage them.
            Create a comprehensive healthcare network with streamlined
            onboarding.
          </p>
        </div>

        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {/* Step 1 */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto'>
                <Building2 className='h-6 w-6' />
              </div>
              <h3 className='mt-4 text-lg font-medium text-gray-900 text-center'>
                Create Facility
              </h3>
              <p className='mt-2 text-sm text-gray-600 text-center'>
                Set up basic facility information including name, contact
                details, and location.
              </p>
            </div>

            {/* Step 2 */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto'>
                <Users className='h-6 w-6' />
              </div>
              <h3 className='mt-4 text-lg font-medium text-gray-900 text-center'>
                Invite Administrator
              </h3>
              <p className='mt-2 text-sm text-gray-600 text-center'>
                Send an invitation to the facility administrator who will manage
                the facility.
              </p>
            </div>

            {/* Step 3 */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto'>
                <Calendar className='h-6 w-6' />
              </div>
              <h3 className='mt-4 text-lg font-medium text-gray-900 text-center'>
                Ready to Operate
              </h3>
              <p className='mt-2 text-sm text-gray-600 text-center'>
                Once the administrator accepts, the facility is ready to start
                managing appointments.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <Button
            onClick={() => setIsModalOpen(true)}
            size='lg'
            leftIcon={<Plus className='h-5 w-5' />}
          >
            Start Facility Onboarding
          </Button>
        </div>

        {/* Features Section */}
        <div className='mt-16'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
            <h2 className='text-2xl font-bold text-gray-900 text-center mb-8'>
              What's Included
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white'>
                    <Building2 className='h-4 w-4' />
                  </div>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Facility Management
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Complete facility profile with contact information and
                    settings.
                  </p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white'>
                    <Users className='h-4 w-4' />
                  </div>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    User Invitations
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Automated email invitations with secure account setup
                    process.
                  </p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-md bg-purple-500 text-white'>
                    <Calendar className='h-4 w-4' />
                  </div>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Appointment System
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Ready-to-use appointment booking and management system.
                  </p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-md bg-yellow-500 text-white'>
                    <Users className='h-4 w-4' />
                  </div>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Role-Based Access
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Secure role-based permissions for different user types.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FacilityOnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FacilityOnboardingPage;
