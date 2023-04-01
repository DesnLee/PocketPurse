import type { FC } from 'react';
import { Icon } from './Icon';

export const AddFloatBtn: FC = () => {
  return (
    <div
      bg-orange
      w-48px
      h-48px
      rounded-24px
      flex
      justify-center
      items-center
      fixed
      bottom-24px
      right-24px
      shadow-xl
    >
      <Icon name='add' color='#fffe' size='20px' />
    </div>
  );
};
