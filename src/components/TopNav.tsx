import type { FC } from 'react';
import { useMenuStore } from '../stores/useMenuStore';
import { Icon } from './Icon';

export const TopNav: FC = () => {
  const { isVisible, setVisible } = useMenuStore();
  return (
    <div flex items-center py-16px color-primary>
      <Icon name='menu' size='24px' onClick={() => setVisible(!isVisible)} />
      <h1 ml-16px text-18px font-bold>
        PocketPurse
      </h1>
    </div>
  );
};
