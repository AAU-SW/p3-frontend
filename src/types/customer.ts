type CustomerBaseSchema = {
  id: string;
  name: string;
};

export type Customer = Omit<CustomerBaseSchema, 'id'>;
