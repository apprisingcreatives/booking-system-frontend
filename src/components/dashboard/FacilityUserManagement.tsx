import React, { useState, useEffect, useMemo } from 'react';
import { Plus, UserCheck, UserX, Mail } from 'lucide-react';
import Button from '../common/Button';
import { CircularLoading } from '../common';
import useGetFacilityInvitations from '../../hooks/useGetFacilityInvitations';
import { useAuth, useGetFacilityUsers } from '../../hooks';
import UserInvitationModal from '../invitation/UserInvitationModal';
import {
  getInvitationStatusColor,
  getRoleDisplayName,
  getStatusColor,
} from './helpers';

const FacilityUserManagement: React.FC = () => {
  const { user } = useAuth();

  const {
    users,
    loading: usersLoading,
    sendRequest: fetchUsers,
  } = useGetFacilityUsers();
  const {
    invitations,
    loading: invitationsLoading,
    refetch: refetchInvitations,
  } = useGetFacilityInvitations(`${user?.facilityId}` || null);

  const pendingInvitations = useMemo(() => {
    return invitations?.filter((invitation) => invitation.status === 'pending');
  }, [invitations]);

  const [invitationModal, setInvitationModal] = useState(false);

  // Filter users to show only facility users
  const facilityUsers = useMemo(() => {
    return users?.filter((u) => u.facilityId === user?.facilityId) || [];
  }, [users, user]);

  const handleAddUser = () => {
    setInvitationModal(true);
  };

  const handleInvitationSuccess = () => {
    refetchInvitations();
  };

  useEffect(() => {
    if (user?.facilityId) {
      fetchUsers(`${user.facilityId}`);
    }
  }, [user?.facilityId]);

  if (usersLoading || invitationsLoading) {
    return (
      <div className='flex justify-center items-center py-20'>
        <CircularLoading size='lg' />
      </div>
    );
  }

  return (
    <div className='w-full p-8 lg:max-w-[80vw] max-w-7xl mx-auto'>
      <div className='mb-8 flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            User Management
          </h2>
          <p className='text-gray-600'>
            Manage users and invitations for your facility
          </p>
        </div>
        <Button onClick={handleAddUser} leftIcon={<Plus className='h-4 w-4' />}>
          Invite User
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Active Users */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <UserCheck className='h-5 w-5 mr-2 text-green-600' />
            Active Users ({facilityUsers.length})
          </h3>

          {facilityUsers.length === 0 ? (
            <div className='text-center py-8'>
              <UserX className='h-12 w-12 text-gray-400 mx-auto mb-3' />
              <p className='text-gray-500'>No active users yet</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {facilityUsers.map((facilityUser) => (
                <div
                  key={facilityUser._id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='flex-shrink-0'>
                      <div className='h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-sm font-medium'>
                          {facilityUser.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        {facilityUser.fullName}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {facilityUser.email}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        facilityUser.status
                      )}`}
                    >
                      {facilityUser.status}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {getRoleDisplayName(facilityUser.role)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Invitations */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <Mail className='h-5 w-5 mr-2 text-blue-600' />
            Pending Invitations ({pendingInvitations.length})
          </h3>

          {pendingInvitations.length === 0 ? (
            <div className='text-center py-8'>
              <Mail className='h-12 w-12 text-gray-400 mx-auto mb-3' />
              <p className='text-gray-500'>No pending invitations</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {pendingInvitations.map((invitation) => (
                <div
                  key={invitation._id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>
                      {invitation.email}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {getRoleDisplayName(invitation.role)} • Invited{' '}
                      {new Date(invitation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getInvitationStatusColor(
                        invitation.status
                      )}`}
                    >
                      {invitation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <UserInvitationModal
        isOpen={invitationModal}
        onClose={() => setInvitationModal(false)}
        onSuccess={handleInvitationSuccess}
      />
    </div>
  );
};

export default FacilityUserManagement;
