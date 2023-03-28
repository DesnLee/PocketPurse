import { useState } from 'react';
import type { FC } from 'react';
import {
  AddFloatBtn,
  TimeRangePicker,
  TopMenu,
  TopNav,
} from '../../components';
import type { TimeRange } from '../../components/TimeRangePicker';
import { useTitle } from '../../hooks';
import { ItemList } from './ItemList';
import { ItemsSummary } from './ItemsSummary';

export const Items: FC = () => {
  useTitle('项目');

  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');

  return (
    <div flex flex-col h-full>
      <header gradient-topnav shadow-primary px-16px shrink-0>
        <TopNav />
        <TimeRangePicker current={currentRange} onChange={setCurrentRange} />
      </header>
      <main grow-1 overflow-scroll>
        <ItemsSummary />
        <ItemList />
      </main>
      <AddFloatBtn />
      <TopMenu />
    </div>
  );
};
