declare namespace API {
  interface Error {
    msg: string;
  }

  interface Resource<T> {
    resource: T;
  }

  interface Resources<T> {
    resources: T[];
    pager: {
      page: number;
      size: number;
      total: number;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SignInData = {
  email: string;
  authCode: string;
};

declare namespace APIResponse {
  type LoginSucceed = {
    msg: 'succeed';
    jwt: string;
    timestamp: number;
  };
}
