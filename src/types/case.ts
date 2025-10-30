import type { Asset } from '@/types/asset.ts';

export type Case = {
  id?: string;
  title: string;
  assignedTo?: string;
  status: string;
  customer?: string;
  createdAt?: string;
  assetId: Asset;
};
