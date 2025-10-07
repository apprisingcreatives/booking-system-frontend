import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserFacilities } from '../hooks/useUserFacilities';
import { Card } from '../components/common';
import { ArrowLeft, Plus, Edit, Trash2, UserCog } from 'lucide-react';

const ManageStaffPage = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const {
    selectedFacility,
    currentFacilityData,
    loadFacilityData,
    loading,
    error,
  } = useUserFacilities();

  useEffect(() => {
    if (facilityId) {
      loadFacilityData(facilityId);
    }
  }, [facilityId, loadFacilityData]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading staff...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center text-red-600'>
          <p className='text-lg font-semibold mb-2'>Error loading staff</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const staff = (selectedFacility || currentFacilityData)?.staff || [];

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => navigate('/dashboard')}
            className='flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Dashboard</span>
          </button>

          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Manage Staff</h1>
              <p className='text-gray-600 mt-1'>
                {(selectedFacility || currentFacilityData)?.facility.name} -{' '}
                {staff.length} staff members
              </p>
            </div>
            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
              <Plus className='w-5 h-5' />
              <span>Add Staff Member</span>
            </button>
          </div>
        </div>

        {/* Staff Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {staff.map((member) => (
            <Card
              key={member._id}
              className='p-6 hover:shadow-lg transition-shadow'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center'>
                    <UserCog className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                      {member.name}
                    </h3>
                    <p className='text-blue-600 text-sm font-medium mb-2'>
                      {member.specialization}
                    </p>
                    <p className='text-gray-600 text-sm'>{member.email}</p>
                    {member.phone && (
                      <p className='text-gray-600 text-sm'>{member.phone}</p>
                    )}
                  </div>
                </div>
                <div className='flex space-x-2'>
                  <button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'>
                    <Edit className='w-4 h-4' />
                  </button>
                  <button className='p-2 text-red-600 hover:bg-red-50 rounded-lg'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {member.bio && (
                <p className='text-gray-600 text-sm mb-3'>{member.bio}</p>
              )}

              <div className='flex items-center justify-between'>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    member.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {member.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {staff.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <UserCog className='w-16 h-16 mx-auto' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              No staff members yet
            </h3>
            <p className='text-gray-600 mb-4'>
              Get started by adding your first staff member
            </p>
            <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg'>
              Add First Staff Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStaffPage;
