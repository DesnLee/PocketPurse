interface ItemsData {
  succeed: APIResponse.Items;
  failed: API.Error;
}

export const itemsData: ItemsData = {
  succeed: {
    resources: [
      {
        id: 0,
        user_id: 0,
        amount: 1000,
        note: '吃饭',
        tag_ids: [0, 1],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
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
