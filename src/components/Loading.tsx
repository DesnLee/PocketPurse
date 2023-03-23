import type { FC } from 'react';
import { Icon } from './Icon';

export const Loading: FC = () => {
  return (
    <div h-screen flex justify-center items-center>
      <div
        w-96px
        aspect-square
        bg='#0006'
        rounded-12px
        flex
        flex-col
        items-center
        justify-center
        p-12px
        className='pp-loading-wrapper'
      >
        <Icon name='loading' color-white size='36px' />
        <p mt-8px text-white text-14px>
          loading
        </p>
      </div>
    </div>
  );
};
