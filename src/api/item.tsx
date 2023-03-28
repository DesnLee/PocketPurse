import { request } from '../lib/request';

export const useItemApi = () => ({
  getItems: (): Promise<APIResponse.Items> => request.get('/api/v1/items'),
});
