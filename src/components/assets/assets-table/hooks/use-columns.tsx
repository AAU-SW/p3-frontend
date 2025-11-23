'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Asset } from '@/types/asset.ts';
import { StatusBadge } from '@/components/status-badge.tsx';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Asset>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
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
        accessorKey: 'registrationNumber',
        header: 'Registration Number',
      },
      {
        accessorKey: 'orderRef.orderNumber',
        header: 'Order Reference',
      },
    ],
    [],
  );

  return columns;
};
