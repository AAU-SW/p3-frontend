import type { User } from './user';
import type { Order } from '@/types/order.ts';
import type { Image } from '@/types/image.ts';

export type Asset = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy?: User; // Is not supported in the backend?
  name: string;
  registrationNumber: string;
  status: 'ACTIVE' | 'CLOSED';
  description: string;
  deletedAt?: string; // Are we going to implement this?
  lastInvoiced?: string; // TODO: Implement a simple button that tracks last date of invoice.
  orderRef?: Order;
  profilePicture?: Image;
};

export type CreateAsset = Omit<
  Asset,
  'id' | 'createdAt' | 'createdBy' | 'updatedBy' | 'updatedAt'
>;
