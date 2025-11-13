import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Asset } from '@/types/asset';
import type { Case } from '@/types/case.ts';
import { getOneAsset } from '@/api/assets.ts';
import { AssetsBaseData } from '@/components/assets/assets-basedata.tsx';
import { AssetsBreadCrumbs } from '@/components/assets/assets-breadcrumbs.tsx';
import { DetailHeader } from '@/components/assets/detail-header.tsx';
import { CasesTable } from '@/components/cases/cases-table/cases-table';
import { getCasesByAssetId } from '@/api/cases.ts';

export const Route = createFileRoute('/assets/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const assetId = Route.useParams();
  const [assetData, setAssetData] = useState<Asset>();
  const [casesData, setCasesData] = useState<Case[]>();

  const [casesLoading, setCasesLoading] = useState(false);
  useEffect(() => {
    const fetchOneAsset = async () => {
      try {
        const response = await getOneAsset(String(assetId.id));
        setAssetData(response);
      } catch (error) {
        console.error(error)
        toast.error('Failed to fetch asset:');
      }
    };

    fetchOneAsset();
  }, [assetId]);

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        setCasesLoading(false);
        const response = await getCasesByAssetId(assetId.id);
        setCasesData(response);
      } catch (error) {
        setCasesLoading(true);
        console.error(error)
        toast.error('Failed to fetch cases');
      } finally {
        setCasesLoading(true);
      }
    };

    fetchAllCases();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <AssetsBreadCrumbs assetTitle={assetData?.name ?? ''} />

      <div className="container mx-auto">
        {assetData && <DetailHeader assetData={assetData} />}

        <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
          <div className="col-span-2">
            <CasesTable data={casesData ?? []} isLoading={casesLoading} />
          </div>
          <div className="col-span-1 flex justify-end">
            <AssetsBaseData data={assetData} />
          </div>
        </div>
      </div>
    </div>
  );
}
