import type { User } from "@/types/user";
import { api } from "./axios";

export async function getCurrentUser() {
	const res = await api.get<User>("/api/users/me"); // Or your own endpoint
	return res.data;
}
