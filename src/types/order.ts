import type { Customer } from '@/types/customer.ts';

export type Order = {
  id: string;
  orderNumber: string;
  connectedCustomer?: Customer;
  name: string;
  product: string;
  notes: string;
  status: string;
};

export type CreateOrder = Omit<Order, 'id'>;
