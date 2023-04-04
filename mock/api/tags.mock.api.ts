import type { MockMethod } from 'vite-plugin-mock';
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
];
