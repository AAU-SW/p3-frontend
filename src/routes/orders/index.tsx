import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Order } from '@/types/order.ts';
import { getOrders } from '@/api/order.ts';
import { OrdersTable } from '@/components/orders/orders-table/orders-table.tsx';

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [ordersData, setOrdersData] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getOrders();
        setOrdersData(response);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Orders </h1>
        </div>
        <OrdersTable data={ordersData ?? []} isLoading={isLoading} />
      </div>
    </>
  );
}
