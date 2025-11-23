export type User = {
  id: string;
  email: string;
  encryptedPassword: string;
  name: string;
  role: 'USER' | 'ADMIN';
};

export type CreateUser = Omit<User, 'id' | 'encryptedPassword'> & {
  password: string;
};
