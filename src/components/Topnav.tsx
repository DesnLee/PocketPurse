import type { FC } from 'react';
import { Icon } from './Icon';

export const Topnav: FC = () => {
  return (
    <div flex items-center py-16px color-primary>
      <Icon name='menu' size='24px' />
      <h1 ml-16px text-18px font-bold>
        PocketPurse
      </h1>
    </div>
  );
};
