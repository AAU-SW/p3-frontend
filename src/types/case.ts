import type { Asset } from '@/types/asset.ts';
import type { Customer } from '@/types/customer.ts';
import type { User } from '@/types/user.ts';

export type CaseStatus = 'ACTIVE' | 'CLOSED';

export type Case = {
  id?: string;
  title: string;
  assignedTo?: User;
  status: CaseStatus;
  connectedCustomer?: Customer;
  createdAt?: string;
  assetId?: Asset;
};
