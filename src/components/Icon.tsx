import type { FC } from 'react';

interface IconProps {
  name: string;
  color?: string;
  size?: string;
  onClick?: () => void;
}
export const Icon: FC<IconProps> = ({ name, color, size, onClick }) => {
  return (
    <svg
      className='pp-icon'
      color={color ?? 'inherit'}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
