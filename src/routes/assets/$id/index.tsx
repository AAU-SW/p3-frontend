import { getOneAsset } from '@/api/assets.ts';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AssetsBaseData } from '@/components/assets/assets-basedata.tsx';
import { AssetsBreadCrumbs } from '@/components/assets/assets-breadcrumbs.tsx';
import { DetailHeader } from '@/components/assets/detail-header.tsx';
import type { Asset } from '@/types/asset';
import { CasesTable } from '@/components/cases/cases-table/cases-table';
import { getCases } from '@/api/cases.ts';
import type { Case } from '@/types/case.ts';
import { toast } from 'sonner';

export const Route = createFileRoute('/assets/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const assetId = Route.useParams();
  const [assetData, setAssetData] = useState<Asset>();
  const [casesData, setCasesData] = useState<Case[]>();

  useEffect(() => {
    const fetchOneAsset = async () => {
      try {
        const response = await getOneAsset(String(assetId.id));
        setAssetData(response);
      } catch (error) {
        console.error('Failed to fetch asset:', error);
      }
    };

    fetchOneAsset();
  }, [assetId]);

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const response = await getCases();
        setCasesData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch cases');
      }
    };

    fetchAllCases();
  }, []);

  console.log(casesData);
  return (
    <div className="flex flex-col w-full">
      <AssetsBreadCrumbs assetTitle={assetData?.name ?? ''} />

      <div className="container mx-auto">
        <DetailHeader title={assetData?.name ?? ''} />

        <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
          <div className="col-span-2">
            <CasesTable data={casesData ?? []} />
          </div>
          <div className="col-span-1 flex justify-end">
            <AssetsBaseData data={assetData} />
          </div>
        </div>
      </div>
    </div>
  );
}
