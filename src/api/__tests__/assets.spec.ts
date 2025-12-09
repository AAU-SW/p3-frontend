import type { CreateAsset } from '@/types/asset';
import { api } from '@/api/axios';
import {
  createAsset,
  deleteAssetById,
  getAssets,
  getAssetsByOrderId,
  getOneAsset,
  updateAsset,
} from '@/api/assets';

vi.mock('@/api/axios', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Assets connection', () => {
  it('should get assets', async () => {
    const getSpy = vi
      .spyOn(api, 'get')
      .mockResolvedValueOnce({ data: ['some data'] });

    const actual = await getAssets();
    expect(actual).toEqual(['some data']);
    expect(getSpy).toHaveBeenCalledWith('/api/assets');
  });

  it('should get asset by id', async () => {
    const getSpy = vi
      .spyOn(api, 'get')
      .mockResolvedValueOnce({ data: 'some data' });
    const assetId = 'assetId';

    const actual = await getOneAsset(assetId);
    expect(actual).toEqual('some data');
    expect(getSpy).toHaveBeenCalledWith('/api/assets/' + assetId);
  });

  it('should get asset by order id', async () => {
    const getSpy = vi
      .spyOn(api, 'get')
      .mockResolvedValueOnce({ data: 'some data' });
    const orderId = 'orderId';

    const actual = await getAssetsByOrderId(orderId);
    expect(actual).toEqual('some data');
    expect(getSpy).toHaveBeenCalledWith('/api/assets/order/' + orderId);
  });

  describe('createAsset', () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it('should create asset without image', async () => {
      const postSpy = vi
        .spyOn(api, 'post')
        .mockResolvedValueOnce({ data: 'created asset' });
      const assetData: CreateAsset = {
        name: 'Asset 1',
        description: 'Test asset',
        registrationNumber: 'reg123',
        status: 'ACTIVE',
      };

      const actual = await createAsset(assetData);

      expect(actual).toEqual('created asset');
      expect(postSpy).toHaveBeenCalledWith('/api/assets', assetData);
    });

    it('should create asset with image', async () => {
      const postSpy = vi
        .spyOn(api, 'post')
        .mockResolvedValueOnce({ data: 'created asset with image' });
      const assetData: CreateAsset = {
        name: 'Asset 2',
        description: 'Test asset with image',
        registrationNumber: 'reg456',
        status: 'ACTIVE',
      };
      const imageFile = new File(['dummy content'], 'image.png', {
        type: 'image/png',
      });

      const actual = await createAsset(assetData, imageFile);

      expect(actual).toEqual('created asset with image');
      // We can't directly check FormData contents, but we can check the call
      expect(postSpy.mock.calls[0][0]).toBe('/api/assets');
      expect(postSpy.mock.calls[0][2]).toEqual({
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });
    it('should update an asset', async () => {
      const postSpy = vi
        .spyOn(api, 'put')
        .mockResolvedValueOnce({ data: 'updated asset' });

      const assetData: CreateAsset = {
        name: 'Asset 2',
        description: 'Test asset with image',
        registrationNumber: 'reg456',
        status: 'ACTIVE',
      };

      const actual = await updateAsset('asset-id', assetData);

      expect(actual).toEqual('updated asset');
      expect(postSpy).toHaveBeenCalledWith(
        '/api/assets/' + 'asset-id',
        assetData,
      );
    });
    it('should delete an asset', async () => {
      const deleteSpy = vi
        .spyOn(api, 'delete')
        .mockResolvedValueOnce({ data: 'deleted asset' });

      const actual = await deleteAssetById('asset-id');

      expect(actual).toEqual('deleted asset');
      expect(deleteSpy).toHaveBeenCalledWith('/api/assets/' + 'asset-id');
    });
  });
});
