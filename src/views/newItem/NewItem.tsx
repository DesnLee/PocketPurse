import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../api/useApi';
import { Form, Icon, Tab, TopNav, TopNavGradient } from '../../components';
import { time } from '../../lib/time';
import { hasError, validate } from '../../lib/validate';
import type { Rules } from '../../lib/validate';
import { useCreateItemStore } from '../../stores/useCreateItemStore';
import { useToastStore } from '../../stores/useToastStore';
import { AccountInput } from './AccountInput';
import { Calendar } from './Calendar';
import { Tags } from './Tags';

const tabs: { key: ItemModel['kind']; label: string }[] = [
  { key: 'expenses', label: '支出' },
  { key: 'income', label: '收入' },
];

const rules: Rules<ItemModel> = [
  { key: 'kind', type: 'required', message: '账单类型不能为空' },
  { key: 'tag_ids', type: 'required', message: '标签不能为空' },
  { key: 'happen_at', type: 'required', message: '账单日期不能为空' },
  { key: 'amount', type: 'required', message: '账单金额不能为空' },
  { key: 'amount', type: 'notEqual', value: 0, message: '账单金额不能为 0' },
];

export const NewItem: FC = () => {
  const { data, setData } = useCreateItemStore();
  const { openToast, closeToast } = useToastStore();
  const { api } = useApi();
  const nav = useNavigate();

  const onSubmit = async () => {
    const errors = validate(data, rules);
    if (hasError(errors)) {
      openToast({
        type: 'error',
        text: Object.values(errors).flat()[0] ?? '未知错误',
      });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        closeToast('error');
      }, 1500);
    } else {
      await api.item.createItem(data);
      nav(-1);
    }
  };

  return (
    <Form className='pp-page-wrapper' onSubmit={onSubmit}>
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
      <AccountInput
        value={data.amount}
        onChange={(amount) => setData({ amount })}
        calendar={
          <Calendar
            value={time(data.happen_at).date}
            onChange={(happen_at) => setData({ happen_at })}
          />
        }
      />
    </Form>
  );
};
