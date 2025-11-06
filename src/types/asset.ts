import type { User } from './user';
import type { Order } from '@/types/order.ts';

type AssetBaseSchema = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User;
  name: string;
  registrationNumber: string;
  status: 'ACTIVE' | 'CLOSED';
  description: string;
  deletedAt?: string; // Are we going to implement this?
  lastInvoiced?: string;
  orderRef?: Order;
};

export type Asset = Omit<
  AssetBaseSchema,
  'id' | 'createdAt' | 'createdBy' | 'updatedBy' | 'updatedAt'
>;