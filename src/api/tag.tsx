import { request } from '../lib/request';

export const useTagApi = () => ({
  getTag: (id: number): Promise<APIResponse.Tag> => {
    return request('/api/v1/tag', { params: { id } });
  },
});
