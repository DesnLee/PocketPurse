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
        tag_ids: [1],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 1,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 2,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 3,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 4,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 5,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 6,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
      {
        id: 7,
        user_id: 0,
        amount: 2000,
        note: '喝水',
        tag_ids: [0],
        happen_at: '2020-01-01',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
        kind: 'expenses',
      },
    ],
    pager: {
      page: 1,
      size: 10,
      total: 8,
    },
  },
  failed: {
    msg: '请求失败',
  },
};
