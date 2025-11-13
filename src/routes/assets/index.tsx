import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Asset } from '@/types/asset.ts';
import { getAssets } from '@/api/assets.ts';
import { AssetsTable } from '@/components/assets/assets-table/assets-table.tsx';
import { CreateAssetDialog } from '@/components/assets/create-asset/create-asset-dialog.tsx';

export const Route = createFileRoute('/assets/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [assetData, setAssetData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(false);
        const response = await getAssets();
        setAssetData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch asset');
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };

    fetchAsset();
  }, []);

  return (
    <div className="w-full p-4 container mx-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-4xl"> Assets </h1>
        <CreateAssetDialog />
      </div>
      <AssetsTable data={assetData} isLoading={loading} />
    </div>
  );
}
