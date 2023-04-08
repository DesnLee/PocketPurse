import type { FC } from 'react';
import { Icon } from './Icon';

interface Props {
  type: 'loading' | 'error';
  text?: string;
}

export const Toast: FC<Props> = ({ type, text = '加载中...' }) => {
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
      className={type === 'loading' ? 'pp-loading-wrapper' : ''}
    >
      <Icon name={type} color='#fff' size='36px' />
      <p mt-8px text-white text-14px text-center>
        {text}
      </p>
    </div>
  );
};
