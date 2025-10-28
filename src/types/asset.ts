import type { User } from './user';

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
};
