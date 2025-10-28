import type { Case } from '@/types/case';
import { api } from './axios';

export async function getCases() {
  const res = await api.get(`api/cases`); 
  return res.data;
}

export async function getOneCase(caseId: string) {
  const res = await api.get<Case>(`api/cases/${caseId}`); 
  return res.data;
}

export async function updateOneCase(caseId: string, data: Partial<Case>) {
  const res = await api.put<Case>(`api/cases/${caseId}`, data); 
  return res.data;
}

export async function deleteOneCase(caseId: string) {
  const res = await api.delete<Case>(`api/cases/${caseId}`); 
  return res.data;
}

export async function createCase(data: Case) {
  const res = await api.post(`/api/cases`, data);
  return res.data;
}
