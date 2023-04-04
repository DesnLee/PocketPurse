import { faker } from '@faker-js/faker';

interface TagData {
  succeed: (params: { id: number }) => APIResponse.Tag;
  failed: API.Error;
}

export const tagData: TagData = {
  succeed: ({ id }) => ({
    resource: {
      id,
      user_id: 0,
      name: faker.word.verb(),
      sign: '🤫',
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.past().toISOString(),
      kind: Math.random() > 0.5 ? 'expenses' : 'income',
    },
  }),
  failed: {
    msg: '请求失败',
  },
};
