import { api } from './axios';

export async function getAssets() {
  const res = await api.get('/api/assets');
  return res.data;
}

export async function getOneAsset(assetId: string) {
  const res = await api.get(`/api/assets/${assetId}`);
  return res.data;
}

export async function postOneAsset(assetId: string) {
  const res = await api.post(`/api/assets/${assetId}`);
  return res.data;
}

export async function deleteOneAsset(assetId: string) {
  const res = await api.delete(`/api/assets/${assetId}`);
  return res.data;
}
