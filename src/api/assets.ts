import type { CreateAsset } from '@/types/asset.ts';
import { api } from '@/api/axios';

export async function getAssets() {
  const res = await api.get('/api/assets');
  return res.data;
}

export async function getOneAsset(assetId: string) {
  const res = await api.get(`/api/assets/${assetId}`);
  return res.data;
}

export async function getAssetsByOrderId(orderId: string) {
  const res = await api.get(`/api/assets/order/${orderId}`);
  return res.data;
}

export async function createAsset(data: CreateAsset, imageFile?: File) {
  // If there's an image file, send as multipart/form-data
  if (imageFile && imageFile.size != 0) {
    const formData = new FormData();
    formData.append('asset', JSON.stringify(data));
    formData.append('image', imageFile as Blob);

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

export async function updateAsset(assetId: string, data: CreateAsset) {
  const res = await api.put(`/api/assets/${assetId}`, data);
  return res.data;
}

export async function deleteAssetById(assetId: string) {
  const res = await api.delete(`/api/assets/${assetId}`);
  return res.data;
}
