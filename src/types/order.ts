import type { Customer } from '@/types/customer.ts';

export type Order = {
  id?: string;
  orderNumber: string;
  connectedCustomers: Customer;
};
