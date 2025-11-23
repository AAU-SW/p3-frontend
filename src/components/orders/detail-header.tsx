import { CreateOrderDialog } from '@/components/orders/create-order/create-order-dialog.tsx';

export const DetailHeader = () => {
  return (
    <div className="flex items-center p-4 pb-0 justify-between gap-2">
      <div className=" flex gap-3">
        <CreateOrderDialog />
      </div>
    </div>
  );
};
