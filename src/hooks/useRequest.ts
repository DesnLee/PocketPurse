import type { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/request';
import { useToastStore } from '../stores/useToastStore';

export const ERROR_MESSAGE: {
  [key: number]: { text: string; jumpTo?: string };
} = {
  400: { text: '请求参数错误' },
  401: { text: '请先登录', jumpTo: '/sign_in' },
  403: { text: '拒绝访问' },
  404: { text: '请求资源未找到' },
  500: { text: '服务器错误' },
  501: { text: '服务未实现' },
  502: { text: '网关错误' },
  503: { text: '服务不可用' },
  504: { text: '网关超时' },
  505: { text: 'HTTP版本不受支持' },
  9999: { text: '未知错误' },
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
  const nav = useNavigate();
  const { openToast, closeToast } = useToastStore();

  const errorHandler = (err: AxiosError) => {
    if (err.response) {
      const { text, jumpTo } =
        ERROR_MESSAGE[err.response.status] ?? ERROR_MESSAGE[9999];
      openToast({
        type: 'error',
        text,
      });
      const timer = setTimeout(() => {
        closeToast('error');
        clearTimeout(timer);
      }, 2000);
      // jump to
      if (jumpTo) {
        nav(jumpTo);
      }
    }

    throw err;
  };

  const request: MyRequest = {
    get: (url, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText ?? '加载中...',
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
          text: options?.loadingText ?? '加载中...',
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
