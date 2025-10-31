'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type { Order } from '@/types/order.ts';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'Order Number',
      },
      {
        accessorKey: 'connectedCustomers',
        header: 'Customer',
      },
    ],
    [],
  );

  return columns;
};
