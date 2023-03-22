declare namespace APIResponse {
  interface Items {
    resources: Item[];
    pager: {
      page: number;
      size: number;
      total: number;
    };
  }

  interface Item {
    id: number;
    name: string;
    amount: number;
  }
}
