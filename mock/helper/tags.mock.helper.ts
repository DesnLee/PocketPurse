import { faker } from '@faker-js/faker';

export const createTag = (kind: ItemModel['kind']) => ({
  id: faker.datatype.number(10000),
  user_id: 0,
  name: faker.word.verb(),
  sign: '🤫',
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.past().toISOString(),
  kind,
});

export const createTags = (kind: ItemModel['kind']) => {
  const tags = [];
  for (let i = 0; i < faker.datatype.number(10); i++) {
    tags.push(createTag(kind));
  }
  return tags;
};
