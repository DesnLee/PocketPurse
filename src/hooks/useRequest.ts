import type { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from '../lib/request';
import { useToastStore } from '../stores/useToastStore';

export const ERROR_MESSAGE = {
  400: '请求参数错误',
  401: '请先登录',
  403: '拒绝访问',
  404: '请求资源未找到',
  500: '服务器错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
};

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
  const { openToast, closeToast } = useToastStore();
  const errorHandler = (err: AxiosError) => {
    const { response } = err;
    openToast({
      type: 'error',
    });
    const timer = setTimeout(() => {
      closeToast('error');
      clearTimeout(timer);
    }, 2000);
    throw err;
  };

  const request: MyRequest = {
    get: (url, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText,
        });
      }
      return axiosInstance
        .get(url)
        .catch(errorHandler)
        .finally(() => closeToast('loading'));
    },
    post: (url, data, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText,
        });
      }
      return axiosInstance
        .post(url, data)
        .catch(errorHandler)
        .finally(() => closeToast('loading'));
    },
  };

  return { request };
};
