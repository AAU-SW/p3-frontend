import type { Order } from '@/types/order';
import type { FC } from 'react';
import { CreateOrderDialog } from '@/components/orders/create-order/create-order-dialog.tsx';

interface DetailHeaderProps {
  onOrderCreated: (newOrder: Order) => void;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ onOrderCreated }) => {
  return (
    <>
      <div className="flex gap-3 w-full justify-between">
        <h1 className="text-4xl"> Orders </h1>
        <CreateOrderDialog onOrderCreated={onOrderCreated} />
      </div>
    </>
  );
};
