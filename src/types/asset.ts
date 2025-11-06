import type { User } from './user';
import type { Order } from '@/types/order.ts';
import type { Image } from '@/types/image.ts';

export type Asset = {
  id?: string;
  name: string;
  registrationNumber: string;
  status: 'ACTIVE' | 'CLOSED';
  description: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  lastInvoiced?: string;
  createdBy?: User;
  updatedBy?: User;
  orderRef?: Order;
  profilePicture?: Image;
};
