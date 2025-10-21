import { api } from "./axios";

export async function getCurrentUser() {
	const res = await api.get("/api/users/me"); // Or your own endpoint
	return res.data;
}
