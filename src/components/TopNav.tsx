import type { FC, ReactNode } from 'react';
import { Icon } from './Icon';

interface Props {
  title?: string;
  leftIcon?: ReactNode;
  color?: string;
}
export const TopNav: FC<Props> = ({
  title = import.meta.env.VITE_APP_NAME,
  leftIcon,
  color,
}) => {
  return (
    <div flex items-center py-16px color={color ?? '[var(--color-primary)]'}>
      <span
        w-24px
        h-24px
        flex
        justify-center
        items-center
        children-w-24px
        children-h-24px
      >
        {leftIcon || <Icon name='arrow_back' size='24px' />}
      </span>
      <h1 ml-8px text-18px font-bold>
        {title}
      </h1>
    </div>
  );
};
