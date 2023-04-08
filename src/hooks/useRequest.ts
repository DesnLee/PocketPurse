import type { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/request';
import { useToastStore } from '../stores/useToastStore';

export const ERROR_MESSAGE: {
  [key: number]: { text: string; jumpTo?: string };
} = {
  400: { text: '请求参数错误' },
  401: { text: '请先登录', jumpTo: '/sign_in' },
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
  const { pathname, search } = useLocation();
  const { openToast, closeToast } = useToastStore();

  const errorHandler = (err: AxiosError<API.Error>) => {
    if (err.response) {
      const error = ERROR_MESSAGE[err.response.status];
      let text;
      let jumpTo = '';

      if (error) {
        text = error.text;
        jumpTo = error.jumpTo ?? '';
      } else if (err.response.data && err.response.data.msg) {
        text = err.response.data.msg;
      } else {
        text = ERROR_MESSAGE[9999].text;
      }
      openToast({
        type: 'error',
        text,
      });

      // jump to
      if (jumpTo) {
        if (err.response.status === 401) {
          const redirect = encodeURIComponent(`${pathname}${search}`);
          nav(`${jumpTo}?redirect=${redirect}`);
        } else {
          nav(jumpTo);
        }
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
        .catch(
          options?.handleError
            ? errorHandler
            : (e) => {
                throw e;
              }
        )
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
        .catch(
          options?.handleError
            ? errorHandler
            : (e) => {
                throw e;
              }
        )
        .finally(() => closeToast('loading'));
    },
  };

  return { request };
};
