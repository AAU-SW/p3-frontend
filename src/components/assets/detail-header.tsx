import type { FC } from 'react';
import type { Asset } from '@/types/asset';
import { CreateCasesDialog } from '@/components/cases/create-cases/create-cases-dialog.tsx';
import { UpdateAssetDialog } from '@/components/assets/update-asset/update-asset-dialog.tsx';

interface DetailHeaderProps {
  assetData: Asset;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ assetData }) => {
  return (
    <div className="flex items-center p-4 pb-0 justify-between gap-2">
      <h1 className="text-4xl font-medium">{assetData.name}</h1>
      <div className=" flex gap-3">
        <CreateCasesDialog />
        <UpdateAssetDialog assetData={assetData} />
      </div>
    </div>
  );
};
