import type {Case} from '@/types/case';
import {api} from './axios';
import type {Customer} from "@/types/customer.ts";

export async function getCustomers() {
    const res = await api.get(`api/customers`);
    return res.data;
}

export async function getOneCustomer(customerId: string) {
    const res = await api.get<Customer>(`api/customers/${customerId}`);
    return res.data;
}

export async function updateOneCustomer(customerId: string, data: Partial<Case>) {
    const res = await api.put<Customer>(`api/customers/${customerId}`, data);
    return res.data;
}

export async function deleteOneCustomer(customerId: string) {
    const res = await api.delete<Customer>(`api/customers/${customerId}`);
    return res.data;
}

export async function createCustomer(data: Case) {
    const res = await api.post(`/api/customers`, data);
    return res.data;
}
