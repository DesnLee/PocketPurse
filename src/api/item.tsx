import { instance } from '../lib/request';

export const useItemApi = () => ({
  getItems: (): Promise<APIResponse.Items> => instance.get('/api/v1/items'),
});
