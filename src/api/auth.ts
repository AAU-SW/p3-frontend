import { api } from "./axios";

export async function login(email: string, password: string) {
	const res = await api.post("/api/auth/login", { email, password });
	localStorage.setItem("accessToken", res.data.accessToken);
	localStorage.setItem("refreshToken", res.data.refreshToken);
	return res.data;
}

export function logout() {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
}
