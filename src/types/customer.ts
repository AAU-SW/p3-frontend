export type Customer = {
  id: string;
  name: string;
};

export type CreateCustomer = Omit<Customer, 'id'>;
