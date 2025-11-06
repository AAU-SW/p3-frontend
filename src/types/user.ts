type UserBaseSchema = {
  id: string;
  email: string;
  encryptedPassword: string;
  name: string;
  role: 'user' | 'admin';
};

export type User = Omit<UserBaseSchema, 'id'>;
