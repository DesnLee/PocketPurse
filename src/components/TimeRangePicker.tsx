import type { FC } from 'react';
import { Tab } from './TopNav/Tab';

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';
interface Props {
  current: TimeRange;
  onChange: (current: TimeRange) => void;
}

type TimeRanges = {
  key: TimeRange;
  label: string;
}[];

const ranges: TimeRanges = [
  { key: 'thisMonth', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'thisYear', label: '本年' },
  { key: 'custom', label: '自定义时间' },
];

export const TimeRangePicker: FC<Props> = ({ current, onChange }) => {
  return <Tab items={ranges} value={current} onChange={onChange} />;
};
