import { api } from './axios';
import type { Case } from '@/types/case';
import type { CreateCustomer, Customer } from '@/types/customer.ts';

export async function getCustomers() {
  const res = await api.get(`api/customers`);
  return res.data;
}

export async function getCustomerById(customerId: string) {
  const res = await api.get<Customer>(`api/customers/${customerId}`);
  return res.data;
}

export async function createCustomer(data: CreateCustomer, imageFile?: File) {
  if (imageFile && imageFile.size != 0) {
    const formData = new FormData();
    formData.append('customer', JSON.stringify(data));
    formData.append('image', imageFile as Blob);

    const res = await api.post(`/api/customers`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }

  const res = await api.post(`/api/customers`, data);
  return res.data;
}

export async function updateCustomerById(
  customerId: string,
  data: Partial<Case>,
) {
  const res = await api.put<Customer[]>(`api/customers/${customerId}`, data);
  return res.data;
}

export async function deleteCustomerById(customerId: string) {
  const res = await api.delete(`api/customers/${customerId}`);
  return res.data;
}
