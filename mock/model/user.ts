interface UserData {
  succeed: APIResponse.User;
  failed: API.Error;
}

export const userData: UserData = {
  succeed: {
    resource: {
      id: 0,
      email: 'jiakun.ui@gmail.com',
      name: 'DesnLee',
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
    },
  },
  failed: {
    msg: '请求失败',
  },
};
