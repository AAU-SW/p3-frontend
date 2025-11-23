'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Order } from '@/types/order.ts';

export const useColumns = () => {
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'Order Number',
      },
      {
        accessorKey: 'connectedCustomer.name',
        header: 'Customer',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'product',
        header: 'Product',
      },
    ],
    [],
  );

  return columns;
};
