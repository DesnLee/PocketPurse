import { request } from '../lib/request';

export const useUserApi = () => ({
  getUser: (): Promise<APIResponse.User> => {
    return request('/api/v1/user');
  },
});
