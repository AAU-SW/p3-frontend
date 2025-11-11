'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Customer } from '@/types/customer.ts';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'id',
        header: 'ID',
      },

    ],[]
  );

  return columns;
};
