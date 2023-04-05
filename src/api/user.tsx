import { request } from '../lib/request';

export const useUserApi = () => ({
  getUser: (): Promise<APIResponse.User> => {
    return request('/api/v1/user');
  },
  sendAuthCode: (email: string): Promise<unknown> => {
    return request.post('/api/v1/send_auth_code', { email });
  },
});
