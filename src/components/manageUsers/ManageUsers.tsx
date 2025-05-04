import { useEffect, useState } from "react";
import { useAuth, useGetAllUsers } from "../../hooks";
import { CircularLoading } from "../common";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { User, UserRole } from "../../models";
import { EditUserModalInterface } from "./types";
import EditUserModal from "./EditUserModal";

const ManageUsersPage = () => {
  const [editUserModalState, setEditUserModalState] =
    useState<EditUserModalInterface>({ open: false, user: null });

  const { user } = useAuth();
  const { users, loading, sendRequest } = useGetAllUsers();

  const onEditUserClick = (user: User) => {
    setEditUserModalState({ open: true, user });
  };

  const handleCloseModal = () => {
    setEditUserModalState({ open: false, user: null });
  };

  const fetchUsers = () => {
    if (user?.role === UserRole.Admin) {
      sendRequest();
    }
  };

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <CircularLoading size="lg" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <TableHeader />
            <TableBody users={users || []} onEditUserClick={onEditUserClick} />
          </table>
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
    </div>
  );
};

export default ManageUsersPage;
