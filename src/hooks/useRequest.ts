import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../lib/request';
import { useToastStore } from '../stores/useToastStore';

interface ExtraOptions {
  loading?: boolean;
  loadingText?: string;
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
  const { setToast } = useToastStore();

  const request: MyRequest = {
    get: (url, options) => {
      if (options?.loading) {
        setToast(true, 'loading', options?.loadingText);
      }
      return axiosInstance.get(url).finally(() => setToast(false));
    },
    post: (url, data, options) => {
      if (options?.loading) {
        setToast(true, 'loading', options?.loadingText);
      }
      return axiosInstance.post(url, data).finally(() => setToast(false));
    },
  };

  return { request };
};
