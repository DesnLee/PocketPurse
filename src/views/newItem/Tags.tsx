import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import { useApi } from '../../api/useApi';
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
  value?: ItemModel['tag_ids'];
  onChange?: (value: ItemModel['tag_ids']) => void;
}
export const Tags: FC<Props> = ({ currentType, value, onChange }) => {
  const { api } = useApi();
  const { data: tags } = useSWR(`tags_${currentType}`, () =>
    api.tag.getTags(currentType)
  );

  return (
    <ol
      grow-1
      overflow-auto
      grid
      grid-cols='[repeat(auto-fit,56px)]'
      grid-rows='[repeat(auto-fit,74px)]'
      gap-x-28px
      gap-y-20px
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
      {tags?.data.resources.map((tag, i) => (
        <li w-56px key={i} onClick={() => onChange?.([tag.id])}>
          <IconWrapper selected={value?.includes(tag.id)}>
            {tag.sign}
          </IconWrapper>
          <p
            text-12px
            leading-12px
            mt-6px
            text-center
            color='#606266'
            max-w-56px
          >
            {tag.name}
          </p>
        </li>
      ))}
    </ol>
  );
};
