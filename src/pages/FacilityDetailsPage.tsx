import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, LoadingSpinner, Badge } from '../components/common';
import { useAuth, useGetFacility } from '../hooks';

import Button from '../components/common/Button';

const FacilityDetailsPage: React.FC = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { facility, loading, errorMessage, fetchFacility } = useGetFacility();

  useEffect(() => {
    if (facilityId) {
      fetchFacility(facilityId);
    }
  }, [facilityId]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <LoadingSpinner size='lg' text='Loading facility details...' />
        </div>
      </div>
    );
  }

  if (errorMessage || !facility) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <p className='text-red-600'>
              {errorMessage || 'Facility not found'}
            </p>
            <Button
              onClick={() => navigate('/admin/manage-facilities')}
              className='mt-4'
            >
              Back to Facilities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                {facility.name}
              </h1>
              <p className='mt-2 text-gray-600'>{facility.address}</p>
            </div>
            <div className='flex items-center space-x-4'>
              <Badge variant={facility.isActive ? 'success' : 'error'}>
                {facility.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <Button
                variant='outline'
                onClick={() => navigate('/admin/manage-facilities')}
              >
                Back to Facilities
              </Button>
            </div>
          </div>
        </div>

        {/* Facility Info */}
        <Card className='mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Contact Information
              </h3>
              <div className='space-y-2 text-sm text-gray-600'>
                <div className='flex items-center'>
                  <span className='font-medium w-20'>Email:</span>
                  <span>{facility.email}</span>
                </div>
                <div className='flex items-center'>
                  <span className='font-medium w-20'>Phone:</span>
                  <span>{facility.phoneNumber}</span>
                </div>
                <div className='flex items-start'>
                  <span className='font-medium w-20'>Address:</span>
                  <span>{facility.address}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center flex-col'>
              <div className='space-y-2'>
                {user && (
                  <Link to={`/facilities/${facilityId}/appointments`}>
                    <Button variant='outline'>Edit Facility</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
