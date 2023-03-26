import { useState } from 'react';
import type { FC } from 'react';
import { AddFloatBtn, TimeRangePicker, Topnav } from '../../components';
import type { TimeRange } from '../../components/TimeRangePicker';
import { useTitle } from '../../hooks';
import { ItemsList } from './ItemsList ';

export const Items: FC = () => {
  useTitle('项目');

  const [currentRange, setCurrentRange] = useState<TimeRange>('thisMonth');

  return (
    <div flex flex-col h-full>
      <div gradient-topnav shadow-primary px-16px shrink-0>
        <Topnav />
        <TimeRangePicker current={currentRange} onChange={setCurrentRange} />
      </div>
      <ItemsList />
      <AddFloatBtn />
    </div>
  );
};
