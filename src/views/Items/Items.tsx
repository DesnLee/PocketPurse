import { useState } from 'react';
import type { FC } from 'react';
import {
  AddFloatBtn,
  Icon,
  TimeRangePicker,
  TopMenu,
  TopNav,
} from '../../components';
import type { TimeRange } from '../../components/TimeRangePicker';
import { useTitle } from '../../hooks';
import { useMenuStore } from '../../stores/useMenuStore';
import { ItemList } from './ItemList';
import { ItemsSummary } from './ItemsSummary';

export const Items: FC = () => {
  useTitle('账单列表');

  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');
  const { isVisible, setVisible } = useMenuStore();

  return (
    <div flex flex-col h-full>
      <header gradient-topnav shadow-primary px-16px shrink-0>
        <TopNav
          title='账单列表'
          leftIcon={<Icon name='menu' onClick={() => setVisible(!isVisible)} />}
        />
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
