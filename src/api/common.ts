import { useRequest } from '../lib/request';

export const useCommonApi = () => {
  const { request } = useRequest();

  return {
    get: <T>(path: string) => request.get<T>(path),
  };
};
