import type { FC } from 'react';
import { Menu } from './Menu';
import { UserInfo } from './UserInfo';

export const TopMenu: FC = () => {
  return (
    <aside
      fixed
      bg-white
      h-full
      w='2/3'
      min-w-16em
      flex
      flex-col
      shadow-primary
      p-16px
    >
      <UserInfo className='grow-0 shrink-0' />
      <Menu className='grow-1 shrink-1' />
    </aside>
  );
};
