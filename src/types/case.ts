import type { User } from '@/types/user.ts';

export type Case = {
  id?: string;
  title: string;
  assignedTo?: User;
  status: string;
  customer?: string;
  createdAt?: string;
};
