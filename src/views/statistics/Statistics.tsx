import { useState } from 'react';
import type { FC } from 'react';
import {
  Icon,
  Input,
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
    { tag: { name: '房贷', sign: '🏠' }, amount: 400000 },
    { tag: { name: '车贷', sign: '🚗' }, amount: 200000 },
    { tag: { name: '吃饭', sign: '🥣' }, amount: 120000 },
    { tag: { name: '通勤', sign: '🚇' }, amount: 54000 },
  ];

  const options: { value: ItemModel['kind']; label: string }[] = [
    { value: 'expenses', label: '支出' },
    { value: 'income', label: '收入' },
  ];
  const [kind, setKind] = useState<ItemModel['kind']>('expenses');

  return (
    <div pp-page-wrapper bg='#f4f4f4'>
      <TopNavGradient>
        <TopNav
          title='统计图表'
          leftIcon={<Icon name='arrow_left' onClick={() => {}} />}
          rightElement={
            <Input
              type='navSelect'
              options={options}
              value={kind}
              onChange={(v) => setKind(v as ItemModel['kind'])}
            />
          }
        />
        <TimeRangePicker current={currentRange} onChange={setCurrentRange} />
      </TopNavGradient>

      <main grow-1 overflow-auto pb-36px flex flex-col bg='#f4f4f4'>
        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            消费趋势
          </h1>
          <LineChart data={data} />
        </section>

        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            消费占比
          </h1>
          <PieChart data={data2} />
        </section>

        {data3?.length > 0 && (
          <section mt-12px m-x-12px py-12px bg-white rounded-12px>
            <h1 text-18px font-bold ml-12px>
              消费排行
            </h1>
            <RankChart data={data3} />
          </section>
        )}
      </main>
    </div>
  );
};
