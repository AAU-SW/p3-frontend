import type { CreateOrder } from '@/types/order.ts';
import { api } from '@/api/axios.ts';

export async function getOrders() {
  const res = await api.get('/api/orders');
  return res.data;
}

export async function createOrder(data: CreateOrder) {
  const res = await api.post(`/api/orders`, data);
  return res.data;
}

export async function updateOrder(orderId: string, data: CreateOrder) {
  const res = await api.put(`/api/orders/${orderId}`, data);
  return res.data;
}
