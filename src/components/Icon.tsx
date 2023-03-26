import type { FC } from 'react';

interface IconProps {
  name: string;
  color?: string;
  size?: string;
}
export const Icon: FC<IconProps> = ({ name, color, size }) => {
  return (
    <svg
      className='pp-icon'
      color={color ?? 'inherit'}
      style={{ width: size, height: size }}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
