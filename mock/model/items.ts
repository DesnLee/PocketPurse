interface ItemsData {
  succeed: APIResponse.Items;
  failed: APIResponse.Error;
}

export const itemsData: ItemsData = {
  succeed: {
    resources: [
      {
        id: 0,
        name: 'item 1',
        amount: 1000,
      },
    ],
    pager: {
      page: 1,
      size: 10,
      total: 100,
    },
  },
  failed: {
    msg: '请求失败',
  },
};
