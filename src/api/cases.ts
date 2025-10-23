import type { Case } from '@/types/case';
import { api } from './axios';

export async function getCases() {
  const res = await api.get<Case>('/api/case'); 
  return res.data;
}

export async function getOneCase() {
  const res = await api.get<Case>('/api/case/${case}'); 
  return res.data;
}

export async function updateOneCase() {
  const res = await api.refresh<Case>('/api/case/me'); 
  return res.data;
}

export async function deleteOneCase() {
  const res = await api.delete<Case>('/api/case/me'); 
  return res.data;
}
