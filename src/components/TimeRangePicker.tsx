import type { FC } from 'react';
import { Tab } from './TopNav/Tab';

export type TimeRange =
  | 'thisMonth'
  | 'lastMonth'
  | 'pastThreeMonths'
  | 'thisYear'
  | 'custom';

export type MyTimeRanges = {
  key: TimeRange;
  label: string;
}[];

interface Props {
  current: TimeRange;
  onChange: (current: TimeRange) => void;
  ranges?: MyTimeRanges;
}

const defaultRanges: MyTimeRanges = [
  { key: 'thisMonth', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'thisYear', label: '本年' },
  { key: 'custom', label: '自定义时间' },
];

export const TimeRangePicker: FC<Props> = ({
  current,
  onChange,
  ranges = defaultRanges,
}) => {
  return <Tab items={ranges} value={current} onChange={onChange} />;
};
