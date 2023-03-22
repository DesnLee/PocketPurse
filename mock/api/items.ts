import type { MockMethod } from 'vite-plugin-mock';
import { itemsData } from '../model/items';

export const itemsAPI: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  statusCode: 200,
  timeout: 1500,
  response: () => {
    return itemsData.succeed;
  },
};
