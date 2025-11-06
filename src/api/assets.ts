import { api } from './axios';
import type { Asset } from '@/types/asset.ts';

export async function getAssets() {
  const res = await api.get('/api/assets');
  return res.data;
}

export async function getOneAsset(assetId: string) {
  const res = await api.get(`/api/assets/${assetId}`);
  return res.data;
}

export async function createAsset(data: Asset, imageFile?: File) {
  // If there's an image file, send as multipart/form-data
  if (imageFile) {
    const formData = new FormData();
    formData.append('asset', JSON.stringify(data));
    formData.append('image', imageFile);

    const res = await api.post(`/api/assets`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }

  // Otherwise, send as regular JSON
  const res = await api.post(`/api/assets`, data);
  return res.data;
}

export async function deleteOneAsset(assetId: string) {
  const res = await api.delete(`/api/assets/${assetId}`);
  return res.data;
}
