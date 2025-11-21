'use client';

import { useMemo } from 'react';
import { Edit } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Case } from '@/types/case';
import { formatDate } from '@/utils/formatDate.ts';
import { StatusBadge } from '@/components/status-badge.tsx';
import { Button } from '@/components/ui/button';

export const useColumns = ({
  onEdit,
}: {
  onEdit?: (caseItem: Case) => void;
}) => {
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
                Created at: {formatDate(caseItem.createdAt)}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'assignedTo.name',
        header: 'Assigned',
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
        accessorKey: 'connectedCustomer.name',
        header: 'Customer',
      },
      {
        accessorKey: 'editCase',
        header: '',
        cell: ({ row }) => {
          const caseItem = row.original;
          return onEdit ? (
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(caseItem);
              }}
            >
              <Edit size={16} />
            </Button>
          ) : undefined;
        },
      },
    ],
    [],
  );

  return columns;
};
