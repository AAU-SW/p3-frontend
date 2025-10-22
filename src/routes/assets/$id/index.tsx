import { getOneAsset } from '@/api/assets.ts';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AssetsBaseData } from '@/components/assets/assets-basedata.tsx';
import { AssetsBreadCrumbs } from '@/components/assets/assets-breadcrumbs.tsx';
import { CasesTable } from '@/components/assets/cases-table/cases-table.tsx';
import { DetailHeader } from '@/components/assets/detail-header.tsx';
import type { Asset } from '@/types/asset';

export const Route = createFileRoute('/assets/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const assetId = Route.useParams();
  const [assetData, setAssetData] = useState<Asset>();

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

  // Test case object
  const caseData = [
    {
      name: 'Udskiftning af vinterdæk',
      assignedTo: 'Ryan Jespersen',
      status: 'Active',
      customer: 'Sporingsgruppen',
      createdAt: '25/10/2025',
    },
    {
      name: 'Udskiftning af sommerdæk',
      assignedTo: 'Peter Jespersen',
      status: 'Closed',
      customer: 'Sporingsgruppen',
      createdAt: '25/10/2023',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <AssetsBreadCrumbs assetTitle={assetData?.name ?? ''} />

      <div className="container mx-auto">
        <DetailHeader title={assetData?.name ?? ''} />

        <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
          <div className="col-span-2">
            <CasesTable data={caseData} />
          </div>
          <div className="col-span-1 flex justify-end">
            <AssetsBaseData data={assetData} />
          </div>
        </div>
      </div>
    </div>
  );
}
