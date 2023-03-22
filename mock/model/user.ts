interface UserData {
  succeed: APIResponse.User;
  failed: APIResponse.Error;
}

export const userData: UserData = {
  succeed: {
    id: 0,
    email: 'jiakun.ui@gmail.com',
  },
  failed: {
    msg: '请求失败',
  },
};
