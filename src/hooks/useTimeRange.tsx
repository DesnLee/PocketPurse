import React, { useEffect, useState } from 'react';
import { Tab } from '../components';
import { time } from '../lib/time';
import type { Time } from '../lib/time';
import { usePopup } from './usePopup';

export type TimeRangeKeys =
  | 'thisMonth'
  | 'lastMonth'
  | 'pastThreeMonths'
  | 'thisYear'
  | 'custom';

type TimeRanges = {
  key: TimeRangeKeys;
  label: string;
}[];

export type TimeRangesParams = {
  key: Exclude<TimeRangeKeys, 'custom'>;
  label: string;
}[];

interface Options {
  ranges?: TimeRangesParams;
  custom?: boolean;
}

type UseTimeRange = (options: Options) => {
  start: Time;
  end: Time;
  TimeRangePicker: JSX.Element;
};

// 默认时间区间组
const defaultRanges: TimeRangesParams = [
  { key: 'thisMonth', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'pastThreeMonths', label: '近三个月' },
  { key: 'thisYear', label: '近一年' },
];

// 获取时间区间对应的时间范围
const getRanges = (key: TimeRangeKeys) => {
  const now = time();
  let start: Time;
  let end = now;
  switch (key) {
    case 'thisMonth':
      start = now.add(-1, 'month');
      break;
    case 'lastMonth':
      start = now.add(-2, 'month');
      end = now.add(-1, 'month');
      break;
    case 'pastThreeMonths':
      start = now.add(-3, 'month');
      break;
    case 'thisYear':
      start = now.add(-1, 'year');
      break;
    default:
      start = now.add(-1, 'month');
      break;
  }
  return { start, end };
};

export const useTimeRange: UseTimeRange = ({
  ranges = defaultRanges,
  custom = false,
}) => {
  // 是否开启自定义时间
  const timeRanges: TimeRanges = [...ranges];
  if (custom) {
    timeRanges.push({ key: 'custom', label: '自定义时间' });
  }

  // 初始化时间范围
  const key = timeRanges[0].key;
  const [currentRange, setCurrentRange] = useState<TimeRangeKeys>(key);
  const [start, setStart] = useState<Time>(getRanges(key).start);
  const [end, setEnd] = useState<Time>(getRanges(key).end);

  // 自定义时间弹窗
  const onConfirm = () => {
    setStart(time());
    setEnd(time());
    close();
  };
  const { open, close, Popup } = usePopup({
    children: (
      <div bg-white w-96px h-96px onClick={onConfirm}>
        自定义时间
      </div>
    ),
    position: 'center',
    closeOnClickMask: false,
    closePointEvent: false,
  });

  // 监听时间区间变化修改时间范围
  useEffect(() => {
    if (currentRange !== 'custom') {
      const { start: newStart, end: newEnd } = getRanges(currentRange);
      setStart(newStart);
      setEnd(newEnd);
    } else {
      open();
    }
  }, [currentRange]);

  return {
    start,
    end,
    TimeRangePicker: (
      <>
        {Popup}
        <Tab
          items={timeRanges}
          value={currentRange}
          onChange={(v) => setCurrentRange(v)}
        />
      </>
    ),
  };
};
