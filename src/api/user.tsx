import { instance } from '../lib/request';

export const useUserApi = () => ({
  getUser: (): Promise<APIResponse.User> => {
    return instance('/api/v1/user');
  },
});
