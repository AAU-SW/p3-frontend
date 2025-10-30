'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Case } from '@/types/case';
import { StatusBadge } from '@/components/status-badge';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Case>[]>(
    () => [
      {
        accessorKey: 'assignedTo',
        header: 'User',
        cell: ({ row }) => {
          const userInitials = row.original.assignedTo?.name;
          return (
            <Avatar>
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          return <StatusBadge status={status} />;
        },
      },
      {
        accessorKey: 'title',
        header: 'Case',
      },
      {
        accessorKey: 'asset',
        header: 'Asset',
      },
    ],
    [],
  );

  return columns;
};
