import {api} from "@/api/axios.ts";
import type {Order} from "@/types/order.ts";

export async function getOrders() {
    const res = await api.get('/api/orders');
    return res.data;
}

export async function createOrders(data: Order) {
    const res = await api.post(`/api/orders`, data);
    return res.data;
}