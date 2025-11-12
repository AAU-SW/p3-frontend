import { api } from './axios';
import type { Case, CreateCase } from '@/types/case';
import type { Comment } from '@/types/comment.ts';

export async function getCases() {
  const res = await api.get(`api/cases`);
  return res.data;
}

export async function getOneCase(caseId: string) {
  const res = await api.get<Case>(`api/cases/${caseId}`);
  return res.data;
}

export async function getCasesByAssetId(assetId: string) {
  const res = await api.get<Case[]>('/api/cases', {
    params: { assetId },
  });
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

export async function createCase(data: CreateCase) {
  const res = await api.post(`/api/cases`, data);
  return res.data;
}

export async function addComment(caseId: string, data: Partial<Comment>) {
  const res = await api.put<Comment>(`api/cases/${caseId}/comment`, data);
  return res.data;
}
