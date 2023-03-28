import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';

interface Props {
  className?: string;
}

const icons = [
  {
    name: 'charts',
    label: '统计图表',
    to: '/charts',
  },
  {
    name: 'export_data',
    label: '导出数据',
    to: '/export',
  },
  {
    name: 'custom_tag',
    label: '自定义标签',
    to: '/tags',
  },
  {
    name: 'account_reminder',
    label: '记账提醒',
    to: '/reminder',
  },
];
export const Menu: FC<Props> = ({ className }) => {
  return (
    <ul className={className} py-24px>
      {icons.map(({ name, label, to }) => (
        <li>
          <NavLink
            to={to}
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
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
