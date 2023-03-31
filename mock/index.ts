import type { MockMethod } from 'vite-plugin-mock';
import { itemsAPI } from './api/items.mock.api';
import { userAPI } from './api/user.mock.api';

export default [...userAPI, ...itemsAPI] as MockMethod[];
