import type { MockMethod } from 'vite-plugin-mock';
import { itemsAPI } from './api/items';
import { userAPI } from './api/user';

export default [userAPI, itemsAPI] as MockMethod[];
