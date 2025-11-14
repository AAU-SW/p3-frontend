'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Customer } from '@/types/customer';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
    ],
    [],
  );

  return columns;
};
