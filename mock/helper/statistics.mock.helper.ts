import { faker } from '@faker-js/faker';

export const createStatisticsData = ({
  start,
  end,
}: {
  start: string;
  end: string;
}): APIResponse.LineChartDataList => {
  const resources: LineChartData[] = [];
  const startTime = new Date(start);
  const endTime = new Date(end);
  // eslint-disable-next-line no-unmodified-loop-condition
  while (startTime < endTime) {
    startTime.setDate(startTime.getDate() + 1);
    resources.push([startTime.toISOString(), faker.datatype.number(100000)]);
  }
  return { resources };
};
