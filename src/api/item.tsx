import { useRequest } from '../lib/request';

export const useItemApi = () => {
  const { request } = useRequest();
  return {
    getItems: () => request.get<APIResponse.Items>('/api/v1/items'),
  };
};
