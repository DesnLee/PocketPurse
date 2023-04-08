import { preload } from 'swr';
import { ErrorNoData, ErrorUnauthorized } from '../vars/errors';

export const isEmptyData = () => {
  return preload('/api/v1/items', async (path) => {
    const response = await fetch(path);
    const data: APIResponse.Items = await response.json();
    if (data.resources.length === 0) {
      throw new ErrorNoData();
    }
    return data;
  });
};

export const isUnaAuthorizedLoader = () => {
  return preload('/api/v1/user', async (path) => {
    const response = await fetch(path);
    const data: APIResponse.User = await response.json();
    if (response.status === 401) {
      throw new ErrorUnauthorized();
    }
    return data;
  });
};
