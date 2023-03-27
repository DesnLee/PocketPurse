import type { FC } from 'react';
import { Icon } from '../Icon';

interface Props {
  className?: string;
}

const icons = [
  {
    name: 'charts',
    label: '统计图表',
  },
  {
    name: 'export_data',
    label: '导出数据',
  },
  {
    name: 'custom_category',
    label: '自定义分类',
  },
  {
    name: 'account_reminder',
    label: '记账提醒',
  },
];
export const Menu: FC<Props> = ({ className }) => {
  return (
    <ul className={className} py-24px>
      {icons.map(({ name, label }) => (
        <li
          grid
          gap-12px
          items-center
          grid-rows-1
          grid-cols='[auto_1fr_auto]'
          py-16px
        >
          <Icon
            key={name}
            name={name}
            size='28px'
            color-primary
            color='#909399'
          />
          <p text-16px text-black>
            {label}
          </p>
          <Icon
            name='arrow_right'
            size='20px'
            color='#c0c4cc'
            className='justify-self-end'
          />
        </li>
      ))}
    </ul>
  );
};
