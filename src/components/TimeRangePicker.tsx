import type { FC } from 'react';

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';
interface Props {
  current: TimeRange;
  onChange: (current: TimeRange) => void;
}

type TimeRanges = {
  key: TimeRange;
  label: string;
}[];

export const TimeRangePicker: FC<Props> = ({ current, onChange }) => {
  const ranges: TimeRanges = [
    { key: 'thisMonth', label: '本月' },
    { key: 'lastMonth', label: '上月' },
    { key: 'thisYear', label: '本年' },
    { key: 'custom', label: '自定义时间' },
  ];

  return (
    <ol
      flex
      gap-12px
      color='#909399'
      mt-8px
      text-16px
      font-bold
      children-p-12px
    >
      {ranges.map((range) => (
        <li
          key={range.key}
          className={current === range.key ? 'time-range-active' : ''}
          onClick={() => onChange(range.key)}
        >
          {range.label}
        </li>
      ))}
    </ol>
  );
};
