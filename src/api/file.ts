import { api } from '@/api/axios.ts';

export async function getImageUrlById(imageId?: string, extension?: string) {
  const filename = `${imageId}${extension}`;
  const res = await api.get<string>('/api/files/url', {
    params: { filename },
  });
  return res.data;
}
