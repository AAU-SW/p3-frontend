import type { Asset } from '@/types/asset.ts';
import type { Customer } from '@/types/customer.ts';
import type { User } from '@/types/user.ts';
import type { Comment } from '@/types/comment.ts';

export type CaseStatus = 'ACTIVE' | 'CLOSED';

export type Case = {
  id: string;
  createdAt: string;
  createdBy: User;
  title: string;
  assignedTo?: User;
  status: CaseStatus;
  connectedCustomer?: Customer;
  assetId?: Asset;
  comments?: Comment[];
};

export type CreateCase = Omit<Case, 'id' | 'createdAt' | 'createdBy'>;
