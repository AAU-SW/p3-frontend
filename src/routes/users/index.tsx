import { createFileRoute } from '@tanstack/react-router';
import type { User } from '@/types/user';
import { UsersTable } from '@/components/users/users-table/users-table.tsx';
import { Button } from '@/components/ui/button';
import Header from '@/components/header.tsx';

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data: Array<User> = [
    {
      name: 'Jonas',
      email: 'jonas@example.com',
      encryptedPassword: '*******',
      role: 'admin',
      id: '1',
    },
    {
      name: 'Ryan',
      email: 'ryan@example.com',
      encryptedPassword: '*******',
      role: 'user',
      id: '2',
    },
  ];

  return (
    <>
      <Header />
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Users </h1>
          <Button variant="outline">Add User</Button>
        </div>
        <UsersTable data={data} />
      </div>
    </>
  );
}
