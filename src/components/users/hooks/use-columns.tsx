'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/types/user.ts';

export const useColumns = () => {
  const columns = useMemo<Array<ColumnDef<User>>>(
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
    ],
    [],
  );

  return columns;
};
