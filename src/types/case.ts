import type { User } from '@/types/user.ts';

export type Case = {
  id?: string;
  title: string;
  description: string;
  location: string;
  assignedTo: User;
  status: string;
  customer: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: User;
};
