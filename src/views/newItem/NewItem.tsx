import { useState } from 'react';
import type { FC } from 'react';
import { Icon, Tab, TopNav, TopNavGradient } from '../../components';
import { AccountInput } from './AccountInput';
import { Tags } from './Tags';

const tabs: { key: ItemModel['kind']; label: string }[] = [
  { key: 'expenses', label: '支出' },
  { key: 'income', label: '收入' },
];

export const NewItem: FC = () => {
  const [current, setCurrent] = useState<ItemModel['kind']>('expenses');

  return (
    <div pp-page-wrapper>
      <TopNavGradient>
        <TopNav title='记一笔' leftIcon={<Icon name='arrow_left' />} />
        <Tab
          layout='full'
          items={tabs}
          value={current}
          onChange={(value) => setCurrent(value)}
        />
      </TopNavGradient>
      <Tags currentType={current} />
      <AccountInput />
    </div>
  );
};
