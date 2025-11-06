import type { User } from './user';
import type { Order } from '@/types/order.ts';
import type { Image } from '@/types/image.ts';

export type Asset = {
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
  profilePicture?: Image;
};

export type CreateAsset = Omit<
  Asset,
  'id' | 'createdAt' | 'createdBy' | 'updatedBy' | 'updatedAt'
>;
