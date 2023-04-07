import { useRequest } from '../lib/request';

export const useTagApi = () => {
  const { request } = useRequest();

  return {
    getTag: (id: number) => {
      return request.get<APIResponse.Tag>(`/api/v1/tag?id=${id}`);
    },
  };
};
