import type { MockMethod } from 'vite-plugin-mock';
import { userData } from '../model/user';

export const userAPI: MockMethod = {
  url: '/api/v1/user',
  method: 'get',
  statusCode: 404,
  response: () => {
    return userData.failed;
  },
};