import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { type FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Asset } from '@/types/asset.ts';
import { getAssets } from '@/api/assets.ts';

interface AssetsSelectorProps {
  onChange: (asset: Asset) => void;
  value?: Asset;
}

export const AssetsSelector: FC<AssetsSelectorProps> = ({
  value,
  onChange,
}) => {
  const [assetsData, setAssetsData] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAllAssets = async () => {
      try {
        const response = await getAssets();
        setAssetsData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch assets');
      }
    };

    fetchAllAssets();
  }, []);

  const handleSelectChange = (selectedId: string) => {
    const selectedAsset = assetsData.find((asset) => asset.id === selectedId);
    if (selectedAsset) {
      onChange(selectedAsset);
    }
  };

  return (
    <Select value={value?.id ?? undefined} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an asset">
          {value ? value.name : 'Select an asset'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {assetsData.map((asset) => (
          <SelectItem key={asset.id} value={String(asset.id)}>
            {asset.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
