import type { MockMethod } from 'vite-plugin-mock';
import { createTags } from '../helper/tags.mock.helper';
import { tagData } from '../model/tags.mock.data';

export const tagsAPI: MockMethod[] = [
  {
    url: '/api/v1/tag',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: Mock.Request) => {
      return tagData.succeed({ id: Number(query.id ?? 0) });
    },
  },
  {
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: Mock.Request) => {
      return { resources: createTags(query.kind as ItemModel['kind']) };
    },
  },
];
