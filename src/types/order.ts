import type { Customer } from '@/types/customer.ts';

export type OrderBaseSchema = {
  id: string;
  orderNumber: string;
  connectedCustomers: Customer;
};

export type Order = Omit<OrderBaseSchema, 'id'>;