import type { Image } from '@/types/image.ts';

export type Customer = {
  id: string;
  name: string;
  logoPicture?: Image;
};

export type CreateCustomer = Omit<Customer, 'id'>;
