import { preload } from 'swr';
import { axiosInstance } from '../lib/request';
import { ErrorNoData, ErrorUnauthorized } from '../vars/errors';

export const isEmptyData = () => {
  return preload(`/api/v1/items`, async (path) => {
    const response = await axiosInstance.get<APIResponse.Items>(path);
    if (response.data.resources.length === 0) {
      throw new ErrorNoData();
    }
    return response;
  });
};

export const isUnaAuthorizedLoader = () => {
  return preload(`/api/v1/me`, async (path) => {
    const response = await axiosInstance.get<APIResponse.User>(path);
    if (response.status === 401) {
      throw new ErrorUnauthorized();
    }
    return response;
  });
};
