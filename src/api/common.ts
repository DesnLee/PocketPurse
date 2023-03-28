import { request } from '../lib/request';

interface CommonApi {
  get: <T>(path: string) => Promise<T>;
}

export const useCommonApi = (): CommonApi => ({
  get: (path) => request.get(path),
});
