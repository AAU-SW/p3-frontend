import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { User } from '@/types/user';
import { UsersTable } from '@/components/users/users-table/users-table.tsx';
import { getUsers } from '@/api/user';
import { CreateUserDialog } from '@/components/users/create-user/create-user-dialog';

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Users </h1>
          <CreateUserDialog
            onUserCreation={(newUser) =>
              setUserData((prev) => [...prev, newUser])
            }
          />
        </div>
        <UsersTable data={userData} isLoading={loading} />
      </div>
    </>
  );
}
