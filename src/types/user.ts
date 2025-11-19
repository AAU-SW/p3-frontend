export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN';
};

export type CreateUser = Omit<User, 'id'>;
