import type { User } from '@/types/user.ts';

export type Comment = {
  id: string;
  comment: string;
  createdBy: User;
  createdAt: string;
};
