'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/types/user.ts';
import { Button } from '@/components/ui/button';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        id: 'deleteUser',
        header: '',
        cell: () => <Button variant="outline">Delete</Button>,
      },
    ],
    [],
  );

  return columns;
};
