import type { CreateOrder } from '@/types/order';
import { api } from '@/api/axios';
import { createOrder, getOrders, updateOrder } from '@/api/order';

vi.mock('@/api/axios', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('order connection', () => {
  it('should get orders', async () => {
    const getSpy = vi
      .spyOn(api, 'get')
      .mockResolvedValueOnce({ data: ['some data'] });

    const actual = await getOrders();
    expect(actual).toEqual(['some data']);
    expect(getSpy).toHaveBeenCalledWith('/api/orders');
  });

  it('should create an order', async () => {
    const postSpy = vi
      .spyOn(api, 'post')
      .mockResolvedValueOnce({ data: 'created order' });
    const orderData: CreateOrder = {
      name: 'Order 1',
      orderNumber: 'ord123',
      product: 'Product A',
      notes: 'Some notes',
      status: 'PENDING',
    };

    const actual = await createOrder(orderData);

    expect(actual).toEqual('created order');
    expect(postSpy).toHaveBeenCalledWith('/api/orders', orderData);
  });
  it('should update an order', async () => {
    const postSpy = vi
      .spyOn(api, 'put')
      .mockResolvedValueOnce({ data: 'updated order' });

    const orderData: CreateOrder = {
      name: 'Order 1',
      orderNumber: 'ord123',
      product: 'Product A',
      notes: 'Some notes',
      status: 'PENDING',
    };

    const actual = await updateOrder('order-id', orderData);

    expect(actual).toEqual('updated order');
    expect(postSpy).toHaveBeenCalledWith(
      '/api/orders/' + 'order-id',
      orderData,
    );
  });
});
