import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../components';

const IconWrapper = styled.div<{ selected?: boolean }>`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0000000b;
  border-radius: 28px;
  font-size: 24px;
  text-align: center;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ selected }) =>
    selected ? 'var(--color-primary)' : 'transparent'};
`;

interface Props {
  currentType: ItemModel['kind'];
}
export const Tags: FC<Props> = ({ currentType }) => {
  const tags = Array.from<string>({ length: 30 }).fill('😄');
  return (
    <ol
      grow-1
      overflow-auto
      grid
      grid-cols='[repeat(auto-fit,56px)]'
      grid-rows='[repeat(auto-fit,74px)]'
      gap-x-28px
      gap-y-20px
      justify-center
      p-16px
      px-10px
    >
      <li w-56px>
        <Link to={`/tags/new?kind=${currentType}`}>
          <IconWrapper>
            <Icon size='20px' color='var(--color-primary)' name='add' />
          </IconWrapper>
        </Link>
      </li>
      {tags.map((tag, i) => (
        <li w-56px key={i}>
          <IconWrapper selected={false}>{tag}</IconWrapper>
          <p text-12px leading-12px mt-6px text-center color='#606266'>
            tag{i}
          </p>
        </li>
      ))}
    </ol>
  );
};
