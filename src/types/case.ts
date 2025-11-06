import type { Asset } from '@/types/asset.ts';
import type { Customer } from '@/types/customer.ts';
import type { User } from '@/types/user.ts';

export type CaseStatus = 'ACTIVE' | 'CLOSED';

type CaseBaseSchema = {
  id: string;
  createdAt: string;
  createdBy: User;
  title: string;
  assignedTo?: User;
  status: CaseStatus;
  connectedCustomer?: Customer;
  assetId?: Asset;
};

export type Case = Omit<CaseBaseSchema, 'id' | 'createdAt' | 'createdBy'>;
