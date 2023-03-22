import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'XXX': 'xxx',
  },
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.XXX = 'xxx';
    config.headers.Authorization = 'Bearer xxx';
    return config;
  },
  () => {
    return Promise.reject(new Error('request error'));
  }
);

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (err) => {
    return Promise.reject(err.response.data);
  }
);

export { instance };