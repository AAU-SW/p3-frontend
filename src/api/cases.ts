import {api} from "@/api/axios.ts";
import type {Case} from "@/types/case.ts";

export async function postOneCase(data: Case) {
    const res = await api.post(`/api/cases`, data);
    return res.data;
}