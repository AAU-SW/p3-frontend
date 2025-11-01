import { createFileRoute } from '@tanstack/react-router';
import { OrdersTable } from '@/components/orders/orders-table/orders-table.tsx';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getOrders } from '@/api/order.ts';
import type { Order } from '@/types/order.ts';
import Header from '@/components/header.tsx';

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [ordersData, setOrdersData] = useState<Order[]>();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await getOrders();
        setOrdersData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch orders');
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Orders </h1>
        </div>
        <OrdersTable data={ordersData ?? []} />
      </div>
    </>
  );
}
