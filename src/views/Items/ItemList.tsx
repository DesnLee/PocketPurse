import type { FC } from 'react';

interface Props {
  items: ItemModel[];
}

export const ItemList: FC<Props> = ({ items }) => {
  return (
    <ul flex flex-col px-16px>
      {items.map((item, index) => (
        <li
          key={item.id}
          py-16px
          grid
          grid-cols='[auto_1fr_auto]'
          grid-rows-2
          items-center
          gap-y-6px
          gap-x-12px
          b-b-1
          b-b-solid
          b-b={index === items.length - 1 ? 'transparent' : '#0000000a'}
        >
          <div
            grid-row-start-1
            grid-col-start-1
            grid-row-end-3
            grid-col-end-2
            w-48px
            h-48px
            flex
            items-center
            justify-center
            text-20px
            bg='#00000009'
            rounded-24px
          >
            💋
          </div>
          <p
            grid-row-start-1
            grid-col-start-2
            grid-row-end-2
            grid-col-end-3
            text-14px
            leading-14px
            color='#303133'
          >
            {item.note}
          </p>
          <p
            grid-row-start-2
            grid-col-start-2
            grid-row-end-3
            grid-col-end-4
            text-12px
            leading-12px
            color='#909399'
          >
            {item.happen_at}
          </p>
          <p
            grid-row-start-1
            grid-col-start-3
            grid-row-end-2
            grid-col-end-4
            text-16px
            leading-16px
            font-bold
            color='#22ba58'
          >
            {item.amount}
          </p>
        </li>
      ))}
    </ul>
  );
};
