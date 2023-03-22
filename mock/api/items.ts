import type { MockMethod } from 'vite-plugin-mock';
import { itemsData } from '../model/items';

export const itemsAPI: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  response: () => {
    return itemsData.succeed;
  },
};
