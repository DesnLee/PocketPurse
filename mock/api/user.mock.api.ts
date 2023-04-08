import type { MockMethod } from 'vite-plugin-mock';
import { userData } from '../model/user.mock.data';

export const userAPI: MockMethod[] = [
  {
    url: '/api/v1/user',
    method: 'get',
    statusCode: 200,
    timeout: 5000,
    response: () => {
      return userData.succeed;
    },
  },
  {
    url: '/api/v1/send_sms_code',
    method: 'post',
    statusCode: 204,
    timeout: 2000,
  },
  {
    url: '/api/v1/sign_in',
    method: 'post',
    statusCode: 200,
    timeout: 1500,
    response: () => {
      return {
        msg: 'succeed',
        jwt: '__JWT__',
        timestamp: Date.now(),
      };
    },
  },
];
