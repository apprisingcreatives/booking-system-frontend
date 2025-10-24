import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth, useGetAllUsers, useRoleAccess } from '../../hooks';
import { CircularLoading } from '../common';
import Button from '../common/Button';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { User, UserRole } from '../../models';
import { EditUserModalInterface } from './types';
import EditUserModal from './EditUserModal';
import UserInvitationModal from '../invitation/UserInvitationModal';

const ManageUsersPage = () => {
  const [editUserModalState, setEditUserModalState] =
    useState<EditUserModalInterface>({ open: false, user: null });
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  const { user } = useAuth();
  const { canInviteUsers } = useRoleAccess();
  const { users, loading, sendRequest } = useGetAllUsers();

  const onEditUserClick = (user: User) => {
    setEditUserModalState({ open: true, user });
  };

  const handleCloseModal = () => {
    setEditUserModalState({ open: false, user: null });
  };

  const fetchUsers = () => {
    if (user?.role === UserRole.SuperAdmin) {
      sendRequest();
    }
  };

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='min-h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                Manage Users
              </h1>
              <p className='text-lg text-gray-600'>
                Manage user accounts and permissions
              </p>
            </div>
            {canInviteUsers && (
              <Button
                onClick={() => setInvitationModalOpen(true)}
                leftIcon={<Plus className='h-4 w-4' />}
              >
                Invite User
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center py-20'>
            <div className='text-center'>
              <CircularLoading size='lg' />
              <p className='mt-4 text-gray-600'>Loading users...</p>
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <TableHeader />
                <TableBody
                  users={users || []}
                  onEditUserClick={onEditUserClick}
                />
              </table>
            </div>
          </div>
        )}

        {editUserModalState.open && (
          <EditUserModal
            open={editUserModalState.open}
            handleClose={handleCloseModal}
            user={editUserModalState.user}
            refetchUsers={fetchUsers}
          />
        )}

        <UserInvitationModal
          isOpen={invitationModalOpen}
          onClose={() => setInvitationModalOpen(false)}
          onSuccess={fetchUsers}
        />
      </div>
    </div>
  );
};

export default ManageUsersPage;
