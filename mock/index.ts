import type { MockMethod } from 'vite-plugin-mock';
import { itemsAPI } from './api/items.mock.api';
import { tagsAPI } from './api/tags.mock.api';
import { userAPI } from './api/user.mock.api';

export default [...userAPI, ...itemsAPI, ...tagsAPI] as MockMethod[];
