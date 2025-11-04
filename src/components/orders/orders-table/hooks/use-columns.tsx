'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Order } from '@/types/order.ts';

export const useColumns = () => {
  const columns = useMemo<Array<ColumnDef<Order>>>(
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
