'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/types/user.ts';
import { Button } from '@/components/ui/button.tsx';

export const useColumns = ({
  onDelete,
}: {
  onDelete: (user: User) => void;
}) => {
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
        cell: ({ row }) => {
          const user = row.original;
          return (
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(user);
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ],
    [onDelete],
  );

  return columns;
};
