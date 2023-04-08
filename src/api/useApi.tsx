import { useRequest } from '../hooks';

export const useApi = () => {
  const { request } = useRequest();

  const api = {
    // user 系列接口
    user: {
      getUser: () =>
        request.get<APIResponse.User>('/api/v1/user', {
          loading: true,
          handleError: true,
        }),
      getSmsCode: (email: string) =>
        request.post<any>(
          '/api/v1/send_sms_code',
          { email },
          { loading: true, loadingText: '请求发送验证码...', handleError: true }
        ),
      signIn: (data: SignInData) =>
        request.post<APIResponse.LoginSucceed>('/api/v1/sign_in', data, {
          loading: true,
          loadingText: '登录中...',
          handleError: true,
        }),
    },
    // item 系列接口
    item: {
      getItems: () =>
        request.get<APIResponse.Items>('/api/v1/items', {
          loading: true,
          handleError: true,
        }),
      createItem: (data: Partial<ItemModel>) =>
        request.post<APIResponse.Item>('/api/v1/items', data, {
          loading: true,
          handleError: true,
        }),
    },
    // tag 系列接口
    tag: {
      getTag: (id: number) =>
        request.get<APIResponse.Tag>(`/api/v1/tag?id=${id}`, {
          loading: true,
          handleError: true,
        }),
      getTags: (kind: ItemModel['kind']) =>
        request.get<APIResponse.Tags>(`/api/v1/tags?kind=${kind}`, {
          loading: true,
          handleError: true,
        }),
      createTag: (data: Partial<TagModel>) =>
        request.post<APIResponse.Tag>('/api/v1/tags', data, {
          loading: true,
          loadingText: '创建中，请稍候...',
          handleError: true,
        }),
    },
  };

  return { api };
};
