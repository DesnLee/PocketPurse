import type { MockMethod } from 'vite-plugin-mock';
import { userData } from '../model/user.mock.data';

export const userAPI: MockMethod = {
  url: '/api/v1/user',
  method: 'get',
  statusCode: 200,
  timeout: 500,
  response: () => {
    return userData.succeed;
  },
};
