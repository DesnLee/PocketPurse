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
