import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { User } from '@/types/user.ts';
import { useColumns } from '@/components/users/hooks/use-columns.tsx';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';

interface UsersTableProps {
  data: User[];
  isLoading: boolean;
}

export const UsersTable: FC<UsersTableProps> = ({ data, isLoading }) => {
  const navigate = useNavigate({ from: '/users' });
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(rowData) => navigate({ to: `/users/${rowData.id}` })}
      isLoading={isLoading}
    />
  );
};
