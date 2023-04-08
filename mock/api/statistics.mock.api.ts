import type { MockMethod } from 'vite-plugin-mock';
import { createStatisticsData } from '../helper/statistics.mock.helper';

export const statisticsAPI: MockMethod[] = [
  {
    url: '/api/v1/statistics/line',
    method: 'get',
    statusCode: 200,
    timeout: 1000,
    response: ({ query }: any) => {
      const { start, end } = query;
      return createStatisticsData({ start, end });
    },
  },
];
