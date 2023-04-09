import type { FC } from 'react';
import {
  AddFloatBtn,
  Icon,
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
  const { start, end, TimeRangePicker, customPopup } = useTimeRange({
    custom: true,
  });

  return (
    <div pp-page-wrapper>
      {customPopup}
      <TopNavGradient>
        <TopNav
          title='账单列表'
          leftIcon={<Icon name='menu' onClick={() => setVisible(!isVisible)} />}
        />
        {TimeRangePicker}
      </TopNavGradient>
      <main grow-1 overflow-auto>
        <ItemsSummary />
        <ItemList start={start.format()} end={end.format()} />
      </main>
      <AddFloatBtn />
      <TopMenu />
    </div>
  );
};
