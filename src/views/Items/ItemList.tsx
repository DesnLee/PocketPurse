import type { FC } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useCommonApi } from '../../api/common';

const getKey = (pageIndex: number) => {
  return `/api/v1/items?page=${pageIndex + 1}&limit=20`;
};

export const ItemList: FC = () => {
  const { data } = useSWRInfinite(getKey, async (path) =>
    useCommonApi().get<APIResponse.Items>(path)
  );

  return (
    <>
      <ul flex flex-col px-16px>
        {data
          ?.map((page) => page.resources)
          .flat(1)
          ?.map((item) => (
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
              // b-b={index === items.length - 1 ? 'transparent' : '#0000000a'}
              b-b='#0000000a'
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
                ¥ {item.amount}
              </p>
            </li>
          ))}
      </ul>

      {(() => {
        if (data?.length !== 0) {
          return (
            <div px-16px pt-16px pb-32px>
              <button pp-btn-info>加载更多</button>
            </div>
          );
        }
      })()}
    </>
  );
};
