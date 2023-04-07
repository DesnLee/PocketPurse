import axios from 'axios';
import { useToastStore } from '../stores/useToastStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem('at');
    jwt && (config.headers.Authorization = `Bearer ${jwt}`);
    return config;
  },
  () => {
    return Promise.reject(new Error('request error'));
  }
);

axiosInstance.interceptors.response.use(
  // (res) => {
  //   return Promise.resolve(res.data);
  // },
  undefined,
  (err) => {
    return Promise.reject(err.response.data);
  }
);

interface ExtraOptions {
  loading?: boolean;
  handleError?: boolean;
}
export const useRequest = () => {
  const { setIsLoading } = useToastStore();

  const request = {
    get: <T>(url: string, options?: ExtraOptions) => {
      if (options?.loading) {
        setIsLoading(true);
      }
      return axiosInstance.get<T>(url).finally(() => {
        if (options?.loading) {
          setIsLoading(false);
        }
      });
    },
    post: <T>(url: string, data: any, options?: ExtraOptions) => {
      if (options?.loading) {
        setIsLoading(true);
      }
      return axiosInstance.post<T>(url, data).finally(() => {
        if (options?.loading) {
          setIsLoading(false);
        }
      });
    },
  };
  return { request };
};

// export { request };
