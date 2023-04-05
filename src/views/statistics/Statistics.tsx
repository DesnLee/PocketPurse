import { useState } from 'react';
import type { FC } from 'react';
import {
  Icon,
  TimeRangePicker,
  TopNav,
  TopNavGradient,
} from '../../components';
import { LineChart } from '../../components/Charts/LineChart';
import type { LineChartData } from '../../components/Charts/LineChart';
import { PieChart } from '../../components/Charts/PieChart';
import type { PieChartData } from '../../components/Charts/PieChart';
import type { TimeRange } from '../../components/TimeRangePicker';
import { time } from '../../lib/time';

export const Statistics: FC = () => {
  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');
  const array = Array.from({ length: 60 }).fill(['2000-01-01', 15]);
  const start = time().add(-1, 'year');
  const data: LineChartData = array.map(() => {
    return [
      start.add(1, 'day').format('yyyy-MM-dd'),
      parseInt((Math.random() * 100).toFixed(0)),
    ];
  });

  const data2: PieChartData = [
    ['吃饭', 480],
    ['买衣服', 1200],
    ['买皮肤', 648],
    ['房贷', 648],
    ['车贷', 648],
  ];

  return (
    <div pp-page-wrapper>
      <TopNavGradient>
        <TopNav
          title='统计图表'
          leftIcon={<Icon name='arrow_left' onClick={() => {}} />}
        />
        <TimeRangePicker current={currentRange} onChange={setCurrentRange} />
      </TopNavGradient>
      <main grow-1 overflow-auto pt-16px pb-36px flex flex-col gap-24px>
        <LineChart data={data} valuePrefix='¥' />
        <PieChart data={data2} valuePrefix='¥' />
      </main>
    </div>
  );
};
