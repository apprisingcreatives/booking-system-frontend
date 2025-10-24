import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, CircularLoading } from '../components/common';
import Button from '../components/common/Button';
import { useAuth } from '../hooks';
import useGetAllFacility from '../hooks/useGetAllFacilities';
import { UserRole, Facility } from '../models';
import EditFacilityModal from '../components/facility/EditFacilityModal';

const FacilitiesPage: React.FC = () => {
  const { sendRequest, loading, errorMessage, facilities } =
    useGetAllFacility();
  const { user } = useAuth();

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    sendRequest();
  }, []);

  const handleEditClick = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async (updatedFacility: Partial<Facility>) => {
    console.log('Saving updated facility:', updatedFacility);
    // TODO: Replace with API call to update facility
    // await updateFacility(updatedFacility._id, updatedFacility);
    await sendRequest();
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8 flex justify-center items-center'>
        <CircularLoading size='lg' label='Loading facilities...' />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='min-h-screen bg-gray-50 py-8 flex justify-center items-center'>
        <div className='text-center'>
          <p className='text-red-600'>{errorMessage}</p>
          <Button onClick={() => window.location.reload()} className='mt-4'>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Healthcare Facilities
          </h1>
          <p className='mt-2 text-gray-600'>
            Discover and manage all healthcare facilities in your network.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {facilities?.map((facility) => (
            <Card
              key={facility._id}
              className='hover:shadow-lg transition-shadow duration-200'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    {facility.name}
                  </h3>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>
                      <span className='font-medium'>Email:</span>{' '}
                      {facility.email}
                    </p>
                    <p>
                      <span className='font-medium'>Phone:</span>{' '}
                      {facility.phoneNumber}
                    </p>
                    <p>
                      <span className='font-medium'>Address:</span>{' '}
                      {facility.address}
                    </p>
                  </div>
                </div>
                <Badge variant={facility.isActive ? 'success' : 'error'}>
                  {facility.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className='mt-4 flex space-x-2'>
                <Link to={`/facilities/${facility._id}`} className='flex-1'>
                  <Button variant='outline' fullWidth>
                    View Details
                  </Button>
                </Link>
                {user && user.role === UserRole.SuperAdmin && (
                  <Button
                    fullWidth
                    onClick={() => handleEditClick(facility)}
                    className='flex-1'
                  >
                    Manage
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {facilities?.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No facilities found</p>
          </div>
        )}
      </div>

      <EditFacilityModal
        facility={selectedFacility}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveChanges}
        fetchFacility={sendRequest}
      />
    </div>
  );
};

export default FacilitiesPage;
