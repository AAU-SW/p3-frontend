import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Asset } from '@/types/asset';
import { getAssetsByOrderId } from '@/api/assets';
import { AssetsTable } from '@/components/assets/assets-table/assets-table';
import { EditOrderDialog } from '@/components/orders/edit-order/edit-order-dialog.tsx';
import { DeleteOrderDialog } from '@/components/orders/delete-order/delete-order-dialog.tsx';

export const Route = createFileRoute('/orders/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const orderId = Route.useParams();
  const [assetsByOrderId, setAssetsByOrderId] = useState<Asset[]>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onDeleteSuccess = () => {
    navigate({
      to: '/orders',
    });
  };

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        setIsLoading(true);
        const response = await getAssetsByOrderId(orderId.id);
        setAssetsByOrderId(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch assets for order');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderById();
  }, [orderId.id]);
  return (
    <div className="w-full p-4 container mx-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-4xl"> Orders </h1>
        <div className="flex gap-4">
          <EditOrderDialog orderId={orderId.id} />
          <DeleteOrderDialog
            orderId={orderId.id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
      <AssetsTable data={assetsByOrderId ?? []} isLoading={isLoading} />
    </div>
  );
}
