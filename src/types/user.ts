export type User = {
  id: string;
  email: string;
  encryptedPassword: string;
  name: string;
  role: 'user' | 'admin';
};

export type CreateUser = Omit<User, 'id' | 'encryptedPassword'> & {
  password: string;
};
