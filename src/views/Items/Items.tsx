import { useState } from 'react';
import type { FC } from 'react';
import useSWR from 'swr';
import { useItemApi } from '../../api';
import { AddFloatBtn, TimeRangePicker, Topnav } from '../../components';
import type { TimeRange } from '../../components/TimeRangePicker';
import { useTitle } from '../../hooks';
import { ItemList } from './ItemList';
import { ItemsSummary } from './ItemsSummary';

export const Items: FC = () => {
  useTitle('项目');

  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');

  const { data, error, isLoading } = useSWR('items', () =>
    useItemApi().getItems()
  );

  return (
    <div flex flex-col h-full>
      <header gradient-topnav shadow-primary px-16px shrink-0>
        <Topnav />
        <TimeRangePicker current={currentRange} onChange={setCurrentRange} />
      </header>
      <main grow-1 overflow-scroll>
        <ItemsSummary />

        {(() => {
          if (isLoading) {
            return (
              <p text-center mt-48px color='#909399'>
                加载数据中...
              </p>
            );
          } else if (error || !data) {
            return <div>{error?.message}</div>;
          } else {
            return <ItemList items={data.resources} />;
          }
        })()}
      </main>
      <AddFloatBtn />
    </div>
  );
};
