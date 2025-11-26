import type { Order } from '@/types/order';
import type { FC } from 'react';
import { CreateOrderDialog } from '@/components/orders/create-order/create-order-dialog.tsx';

interface DetailHeaderProps {
  onOrderCreated: (newOrder: Order) => void;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ onOrderCreated }) => {
  return (
    <div className="flex items-center p-4 pb-0 justify-between gap-2">
      <div className="flex gap-3 w-full justify-end">
        <CreateOrderDialog onOrderCreated={onOrderCreated} />
      </div>
    </div>
  );
};
