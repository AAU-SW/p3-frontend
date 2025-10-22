export type User = {
  id: string;
  email: string;
  encryptedPassword: string;
  name: string;
  role: 'user' | 'admin';
};
