import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { FC } from 'react';
import type { Order } from '@/types/order';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { getOrders } from '@/api/order';

interface OrderSelectorProps {
  onChange: (order: Order) => void;
  value?: Order;
}

export const OrderSelector: FC<OrderSelectorProps> = ({ value, onChange }) => {
  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOrders()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch orders');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectChange = (selectedId: string) => {
    const selectedOrder = data.find((order) => order.id === selectedId);
    if (selectedOrder) {
      onChange(selectedOrder);
    }
  };

  return (
    <Select
      value={value?.id || undefined}
      onValueChange={handleSelectChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an order" />
      </SelectTrigger>
      <SelectContent>
        {data.map((order) => (
          <SelectItem key={order.id} value={order.id}>
            <div className="space-x-1">
              <span className="text-gray-600 font-bold">
                {order.connectedCustomer?.name}
              </span>
              <span className="text-gray-600">#{order.orderNumber}</span>
              <span>-</span>
              <span className="">{order.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
