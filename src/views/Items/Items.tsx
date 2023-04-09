import type { FC } from 'react';
import {
  AddFloatBtn,
  Icon,
  TimeRangePicker,
  TopMenu,
  TopNav,
  TopNavGradient,
} from '../../components';
import { useTitle } from '../../hooks';
import { useTimeRange } from '../../hooks/useTimeRange';
import { useMenuStore } from '../../stores';
import { ItemList } from './ItemList';
import { ItemsSummary } from './ItemsSummary';

export const Items: FC = () => {
  useTitle('账单列表');
  const { isVisible, setVisible } = useMenuStore();

  // 构造时间范围
  const { start, end, currentRange, setCurrentRange } = useTimeRange();

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
        <ItemList start={start} end={end} />
      </main>
      <AddFloatBtn />
      <TopMenu />
    </div>
  );
};
