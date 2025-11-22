'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Case } from '@/types/case';
import { formatDate } from '@/utils/formatDate.ts';
import { StatusBadge } from '@/components/status-badge.tsx';

export const useColumns = (showAsset: boolean) => {
  const columns = useMemo<ColumnDef<Case>[]>(() => {
    const baseColumns: ColumnDef<Case>[] = [
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
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
    ];

    if (showAsset) {
      baseColumns.push({
        accessorKey: 'assetId.name',
        header: 'Connected Asset',
      });
    }

    return baseColumns;
  }, [showAsset]);

  return columns;
};
