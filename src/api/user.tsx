import { useRequest } from '../lib/request';

export const useUserApi = () => {
  const { request } = useRequest();
  return {
    getUser: () => {
      return request.get<APIResponse.User>('/api/v1/user');
    },
  };
};
