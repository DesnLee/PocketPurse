import type { FC } from 'react';
import { Icon, Tab, TopNav, TopNavGradient } from '../../components';
import { useCreateItemStore } from '../../stores/useCreateItemStore';
import { AccountInput } from './AccountInput';
import { Tags } from './Tags';

const tabs: { key: ItemModel['kind']; label: string }[] = [
  { key: 'expenses', label: '支出' },
  { key: 'income', label: '收入' },
];

export const NewItem: FC = () => {
  const { data, setData } = useCreateItemStore();

  return (
    <div pp-page-wrapper>
      {JSON.stringify(data)}
      <TopNavGradient>
        <TopNav title='记一笔' leftIcon={<Icon name='arrow_left' />} />
        <Tab
          layout='full'
          items={tabs}
          value={data.kind!}
          onChange={(kind) => setData({ kind, tag_ids: [] })}
        />
      </TopNavGradient>
      <Tags
        currentType={data.kind!}
        value={data.tag_ids}
        onChange={(tag_ids) => setData({ tag_ids })}
      />
      <AccountInput />
    </div>
  );
};
