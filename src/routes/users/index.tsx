import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { User } from '@/types/user';
import { getUsers } from '@/api/user';
import { CreateUserDialog } from '@/components/users/create-user/create-user-dialog';
import { UsersTable } from '@/components/users/users-table/users-table.tsx';
import { DeleteUserDialog } from '@/components/users/delete-user-dialog.tsx';

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUserCreation = (newUser: User) => {
    setUserData((prevUsers) => [...prevUsers, newUser]);
  };
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        setUserData(response);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onDeleteSuccess = useCallback(() => {
    setUserData((prev) => prev.filter((u) => u.id !== selectedUser?.id));

    setSelectedUser(null);
    setDeleteOpen(false);

    toast.success('User deleted');
  }, [selectedUser]);

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Users </h1>
          <CreateUserDialog onUserCreation={handleUserCreation} />
        </div>

        <UsersTable
          data={userData}
          isLoading={loading}
          onDelete={handleDelete}
        />

        <DeleteUserDialog
          userId={selectedUser?.id ?? null}
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) setSelectedUser(null);
          }}
          onDeleteSuccess={onDeleteSuccess}
        />
      </div>
    </>
  );
}
