import { useEffect, useState } from 'react';
import { Tab } from '../components';
import { time } from '../lib/time';
import type { Time } from '../lib/time';

export type TimeRangeKeys =
  | 'thisMonth'
  | 'lastMonth'
  | 'pastThreeMonths'
  | 'thisYear'
  | 'custom';

export type MyTimeRanges = {
  key: TimeRangeKeys;
  label: string;
}[];

type UseTimeRange = (ranges?: MyTimeRanges) => {
  start: Time;
  end: Time;
  TimeRangePicker: JSX.Element;
};

const defaultRanges: MyTimeRanges = [
  { key: 'thisMonth', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'pastThreeMonths', label: '近三个月' },
  { key: 'thisYear', label: '近一年' },
];

export const useTimeRange: UseTimeRange = (ranges = defaultRanges) => {
  const [currentRange, setCurrentRange] = useState<TimeRangeKeys>('thisMonth');
  const [start, setStart] = useState<Time>(time().add(-1, 'month'));
  const [end, setEnd] = useState<Time>(time());

  useEffect(() => {
    const now = time();
    let start: Time;
    let end: Time;
    switch (currentRange) {
      case 'thisMonth':
        start = now.add(-1, 'month');
        end = now;
        break;
      case 'lastMonth':
        start = now.add(-2, 'month');
        end = now.add(-1, 'month');
        break;
      case 'pastThreeMonths':
        start = now.add(-3, 'month');
        end = now;
        break;
      case 'thisYear':
        start = now.add(-1, 'year');
        end = now;
        break;
      default:
        start = now.add(-1, 'month');
        end = now;
        break;
    }
    setStart(start);
    setEnd(end);
  }, [currentRange]);

  return {
    start,
    end,
    TimeRangePicker: (
      <Tab
        items={ranges || defaultRanges}
        value={currentRange}
        onChange={(v) => setCurrentRange(v)}
      />
    ),
  };
};
