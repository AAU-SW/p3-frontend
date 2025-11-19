import type { FC } from 'react';
import { CreateOrderDialog } from '@/components/orders/create-order/create-order-dialog.tsx';
import type { Order } from '@/types/order';


export const DetailHeader = () => {


  return (
    <div className="flex items-center p-4 pb-0 justify-between gap-2">
      <h1 className="text-4xl font-medium"></h1>
      <div className=" flex gap-3">
        <CreateOrderDialog />
      </div>
    </div>
  );
};
