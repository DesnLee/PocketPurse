import type { FC } from 'react';
import { Icon } from './Icon';

interface Props {
  text?: string;
}

export const Loading: FC<Props> = ({ text = '加载中...' }) => {
  return (
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
      <Icon name='loading' color='#fff' size='36px' />
      <p mt-8px text-white text-14px>
        {text}
      </p>
    </div>
  );
};
