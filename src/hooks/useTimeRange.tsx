import { useEffect, useState } from 'react';
import type { TimeRange } from '../components/TimeRangePicker';
import { time } from '../lib/time';

export const useTimeRange = () => {
  // 构造时间范围
  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');
  const [start, setStart] = useState<string>(time().add(-1, 'month').format());
  const [end, setEnd] = useState<string>(time().format());

  // 根据当前时间范围，计算开始时间和结束时间
  useEffect(() => {
    const now = time();
    let start = '';
    let end = '';
    switch (currentRange) {
      case 'thisMonth':
        start = now.add(-1, 'month').format();
        end = now.format();
        break;
      case 'lastMonth':
        start = now.add(-2, 'month').format();
        end = now.add(-1, 'month').format();
        break;
      case 'pastThreeMonths':
        start = now.add(-3, 'month').format();
        end = now.format();
        break;
      case 'thisYear':
        start = now.add(-1, 'year').format();
        end = now.format();
        break;
      default:
        break;
    }
    setStart(() => start);
    setEnd(() => end);
  }, [currentRange]);

  return {
    currentRange,
    setCurrentRange,
    start,
    end,
  };
};
