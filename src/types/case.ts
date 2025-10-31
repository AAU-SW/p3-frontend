import type { Customer } from '@/types/customer.ts';
import type { User } from '@/types/user.ts';

export type Case = {
  id?: string;
  title: string;
  assignedTo?: User;
  status: string;
  customer?: Customer;
  createdAt?: string;
};
