import { useEffect, useState } from 'react';
import type { FC } from 'react';
import useSWRImmutable from 'swr/immutable';
import { useApi } from '../../api/useApi';
import {
  Input,
  TimeRangePicker,
  TopNav,
  TopNavGradient,
} from '../../components';
import { LineChart } from '../../components/Charts/LineChart';
import { PieChart } from '../../components/Charts/PieChart';
import { RankChart } from '../../components/Charts/RankChart ';
import type { MyTimeRanges, TimeRange } from '../../components/TimeRangePicker';
import { time } from '../../lib/time';

const ranges: MyTimeRanges = [
  { key: 'thisMonth', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'pastThreeMonths', label: '近三个月' },
  { key: 'thisYear', label: '近一年' },
];

export const Statistics: FC = () => {
  const { api } = useApi();

  const options: { value: ItemModel['kind']; label: string }[] = [
    { value: 'expenses', label: '支出' },
    { value: 'income', label: '收入' },
  ];
  const [kind, setKind] = useState<ItemModel['kind']>('expenses');

  // 构造时间范围
  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');
  const [startAndEnd, setStartAndEnd] = useState<{
    start: string;
    end: string;
  }>({
    start: time().add(-1, 'month').format(),
    end: time().format(),
  });
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
    setStartAndEnd(() => ({ start, end }));
  }, [currentRange]);

  // 请求折线图数据，并补充数据
  const [displayLineData, setDisplayLineData] = useState<SummaryByHappened[]>(
    []
  );
  const { data: lineChartData } = useSWRImmutable(
    `lineChart_${kind}_${startAndEnd.start}_${startAndEnd.end}`,
    () =>
      api.statistics.getLineData({
        kind,
        start: startAndEnd.start,
        end: startAndEnd.end,
      })
  );
  useEffect(() => {
    if (!lineChartData || lineChartData.data.groups.length === 0) {
      return;
    }
    const dataList = lineChartData.data.groups;

    const result: SummaryByHappened[] = [];
    let current = new Date(startAndEnd.start);
    const end = new Date(startAndEnd.end);
    while (current <= end) {
      const date = time(current).format('yyyy-MM-dd');
      const find = dataList.find(
        (item) => time(item.happened_at).format() === time(date).format()
      );
      if (find) {
        result.push(find);
      } else {
        result.push({
          happened_at: date,
          tag: null,
          amount: 0,
        });
      }
      current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }

    setDisplayLineData(result);
  }, [lineChartData]);

  // 请求饼图数据
  const { data: pieChartData } = useSWRImmutable(
    `pieChart_${kind}_${startAndEnd.start}_${startAndEnd.end}`,
    () =>
      api.statistics.getPieData({
        kind,
        start: startAndEnd.start,
        end: startAndEnd.end,
      })
  );

  return (
    <div pp-page-wrapper bg='#f4f4f4'>
      <TopNavGradient>
        <TopNav
          title='统计图表'
          rightElement={
            <Input
              type='navSelect'
              options={options}
              value={kind}
              onChange={(v) => setKind(v as ItemModel['kind'])}
            />
          }
        />
        <TimeRangePicker
          current={currentRange}
          onChange={setCurrentRange}
          ranges={ranges}
        />
      </TopNavGradient>

      <main grow-1 overflow-auto pb-36px flex flex-col bg='#f4f4f4'>
        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            {kind === 'expenses' ? '消费' : '收入'}趋势
          </h1>
          <LineChart data={displayLineData} />
        </section>

        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            {kind === 'expenses' ? '消费' : '收入'}占比
          </h1>
          <PieChart data={pieChartData?.data.groups ?? []} />
        </section>

        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            {kind === 'expenses' ? '消费' : '收入'}排行
          </h1>
          <RankChart data={pieChartData?.data.groups ?? []} />
        </section>
      </main>
    </div>
  );
};
