import type { Customer } from '@/types/customer.ts';

export type Case = {
  id?: string;
  title: string;
  assignedTo?: string;
  status: string;
  customer?: Customer;
  createdAt?: string;
};
