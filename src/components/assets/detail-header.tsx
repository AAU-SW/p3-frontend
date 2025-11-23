import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { Asset } from '@/types/asset';
import type { Case } from '@/types/case';
import { CreateCasesDialog } from '@/components/cases/create-cases/create-cases-dialog.tsx';
import { UpdateAssetDialog } from '@/components/assets/update-asset/update-asset-dialog.tsx';
import { DeleteAssetDialog } from '@/components/assets/delete-asset/delete-asset-dialog.tsx';

interface DetailHeaderProps {
  assetData: Asset;
  onCaseCreated: (newCase: Case) => void;
  onAssetUpdate?: (updatedAsset: Asset) => void;
}

export const DetailHeader: FC<DetailHeaderProps> = ({
  assetData,
  onCaseCreated,
  onAssetUpdate,
}) => {
  const navigate = useNavigate();
  const onDeleteSuccess = () => {
    navigate({
      to: '/assets',
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center pb-0 justify-between ">
        <h1 className="text-4xl font-medium">{assetData.name}</h1>
        <div className=" flex gap-3">
          <CreateCasesDialog onCreated={onCaseCreated} />
          <UpdateAssetDialog assetData={assetData} onUpdate={onAssetUpdate} />
          <DeleteAssetDialog
            assetId={assetData.id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
    </div>
  );
};
