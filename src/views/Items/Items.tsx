import { useState } from 'react';
import type { FC } from 'react';
import {
  AddFloatBtn,
  Icon,
  TimeRangePicker,
  TopMenu,
  TopNav,
  TopNavGradient,
} from '../../components';
import type { TimeRange } from '../../components/TimeRangePicker';
import { useTitle } from '../../hooks';
import { useMenuStore } from '../../stores';
import { ItemList } from './ItemList';
import { ItemsSummary } from './ItemsSummary';

export const Items: FC = () => {
  useTitle('账单列表');

  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');
  const { isVisible, setVisible } = useMenuStore();

  return (
    <div pp-page-wrapper>
      <TopNavGradient>
        <TopNav
          title='账单列表'
          leftIcon={<Icon name='menu' onClick={() => setVisible(!isVisible)} />}
        />
        <TimeRangePicker current={currentRange} onChange={setCurrentRange} />
      </TopNavGradient>
      <main grow-1 overflow-auto>
        <ItemsSummary />
        <ItemList />
      </main>
      <AddFloatBtn />
      <TopMenu />
    </div>
  );
};
