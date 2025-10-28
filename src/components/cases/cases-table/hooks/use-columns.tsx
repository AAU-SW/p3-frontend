'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import type { Case } from '@/types/case';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Case>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
          const caseItem = row.original;

          return (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                {caseItem.title}
              </span>
              <span className="text-sm text-gray-500">
                Created: {caseItem.createdAt}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'assignedTo',
        header: 'Assigned',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as 'Active' | 'Closed';

          const statusColor =
            status === 'Active'
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-red-100 text-red-800 border-red-300';

          return <Badge className={`${statusColor}`}>{status}</Badge>;
        },
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
    ],
    [],
  );

  return columns;
};
