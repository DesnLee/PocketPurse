import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../lib/request';
import { useToastStore } from '../stores/useToastStore';

interface ExtraOptions {
  loading?: boolean;
  handleError?: boolean;
}

export interface MyRequest {
  get: <T>(
    url: string,
    options?: ExtraOptions
  ) => Promise<AxiosResponse<T, any>>;
  post: <T>(
    url: string,
    data: any,
    options?: ExtraOptions
  ) => Promise<AxiosResponse<T, any>>;
}

export const useRequest = () => {
  const { setIsLoading } = useToastStore();

  const request: MyRequest = {
    get: (url, options) => {
      setIsLoading(!!options?.loading);
      return axiosInstance.get(url).finally(() => setIsLoading(false));
    },
    post: (url, data, options) => {
      setIsLoading(!!options?.loading);
      return axiosInstance.post(url, data).finally(() => setIsLoading(false));
    },
  };

  return { request };
};
