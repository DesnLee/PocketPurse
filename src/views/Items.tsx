import type { FC } from 'react';
import { Icon } from '../components/Icon';
import { useTitle } from '../hooks/useTitle';

export const Items: FC = () => {
  useTitle('项目');

  return (
    <>
      <div>items</div>
      <div
        bg-orange
        w-24px
        h-24px
        rounded-12px
        flex
        justify-center
        items-center
      >
        <Icon name='add' color='#fffe' size='16px' />
      </div>
    </>
  );
};
