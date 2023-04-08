import type { MockMethod } from 'vite-plugin-mock';
import { itemsData } from '../model/items.mock.data';

export const itemsAPI: MockMethod[] = [
  {
    url: '/api/v1/items',
    method: 'get',
    statusCode: 200,
    timeout: 1000,
    response: ({ query }: Mock.Request) => {
      return itemsData.succeed({
        page: parseInt(query.page) || 1,
        size: parseInt(query.limit) || 10,
        total: 24,
      });
    },
  },
  {
    url: '/api/v1/item',
    method: 'post',
    statusCode: 200,
    timeout: 1000,
    response: ({ body }: any): APIResponse.Item => {
      return { resource: body };
    },
  },
];
