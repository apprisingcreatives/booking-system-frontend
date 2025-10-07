import React, { useState } from 'react';
import { ArrowLeft, Plus, Wrench } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth, useRoleAccess } from '../hooks';
import { useUserFacilities } from '../hooks/useUserFacilities';
import { CircularLoading, ServiceModal } from '../components';

const ServicesManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { facilityId } = useParams<{ facilityId: string }>();
  const { user } = useAuth();
  const { canManageServices } = useRoleAccess();
  const {
    services,
    loadingServices,
    sendRequestFacilityServices: fetchServices,
  } = useUserFacilities();
  console.log(`@@@@@@@@@@@services`, services);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!canManageServices) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
        <div className='bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full'>
          <Wrench className='mx-auto h-12 w-12 text-gray-400' />
          <h2 className='mt-4 text-lg font-semibold text-gray-900'>
            Access Denied
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            You don’t have permission to manage facility services.
          </p>
          <Button
            className='mt-6 w-full'
            variant='outline'
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (loadingServices) {
    return (
      <div className='mt-4'>
        <CircularLoading size='lg' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-10'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center space-x-3'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => navigate('/dashboard')}
              leftIcon={<ArrowLeft className='h-4 w-4' />}
            >
              Back
            </Button>
            <h1 className='text-2xl font-bold text-gray-900'>
              Manage Services
            </h1>
          </div>
          <Button
            leftIcon={<Plus className='h-4 w-4' />}
            onClick={handleOpenModal}
          >
            Add Service
          </Button>
        </div>

        {/* Facility Info */}
        {user?.facilityId && (
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8'>
            <p className='text-sm text-gray-500 mb-1'>Managing services for:</p>
            <h2 className='text-lg font-semibold text-gray-900'>
              Facility ID: {user.facilityId as string}
            </h2>
          </div>
        )}

        {/* Services List */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200'>
          {services.length > 0 ? (
            <ul className='divide-y divide-gray-100'>
              {services.map((s) => (
                <li
                  key={s._id}
                  className='p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between'
                >
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {s.name}
                    </h3>
                    <p className='text-sm text-gray-600 mt-1 max-w-lg'>
                      {s.description}
                    </p>
                    <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                      <span>⏱ {s.durationMinutes} mins</span>
                      <span>💰 ₱{s.price}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {s.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-center py-16'>
              <Wrench className='mx-auto h-10 w-10 text-gray-400' />
              <p className='mt-4 text-gray-500'>
                No services available for this facility.
              </p>
              <Button className='mt-6' onClick={handleOpenModal}>
                Add Your First Service
              </Button>
            </div>
          )}
        </div>

        {/* Add Service Modal */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={() => fetchServices(facilityId as string)}
        />
      </div>
    </div>
  );
};

export default ServicesManagementPage;
