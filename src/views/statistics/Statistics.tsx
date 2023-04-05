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
import type { RankChartData } from '../../components/Charts/RankChart ';
import { RankChart } from '../../components/Charts/RankChart ';
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

  const data3: RankChartData = [
    { tag: { name: '房贷', sign: '🏠' }, amount: 4000 },
    { tag: { name: '车贷', sign: '🚗' }, amount: 2000 },
    { tag: { name: '吃饭', sign: '🥣' }, amount: 1200 },
    { tag: { name: '通勤', sign: '🚇' }, amount: 540 },
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
      <main grow-1 overflow-auto pt-16px pb-36px flex flex-col>
        <section>
          <h1 text-18px font-bold ml-16px>
            消费趋势
          </h1>
          <LineChart data={data} valuePrefix='¥' />
        </section>

        <section mt-28px>
          <h1 text-18px font-bold ml-16px>
            消费占比
          </h1>
          <PieChart data={data2} valuePrefix='¥' />
        </section>

        {data3?.length > 0 && (
          <section mt-8px>
            <h1 text-18px font-bold ml-16px>
              消费排行
            </h1>
            <RankChart data={data3} valuePrefix='¥' />
          </section>
        )}
      </main>
    </div>
  );
};
