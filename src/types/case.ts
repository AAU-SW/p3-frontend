import type { User } from "@/types/user.ts";

export type Case = {
  id?: string;
  name: string;
  assignedTo: User;
  status: string;
  customer: string;
  createdAt?: string;
  createdBy: User;
};
