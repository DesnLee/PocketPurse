import { useState } from 'react';
import type { FC } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useCommonApi } from '../../api/common';

interface BottomBlockProps {
  type: 'error' | 'next' | 'loading' | 'noMore';
  onClick?: () => void;
}
const BottomBlock: FC<BottomBlockProps> = ({ type, onClick }) => {
  if (type === 'loading') {
    return (
      <div px-16px pt-16px pb-32px>
        <p pp-btn-info>加载数据中</p>
      </div>
    );
  } else if (type === 'error') {
    return (
      <div px-16px pt-16px pb-32px onClick={onClick}>
        <p pp-btn-info>加载失败，点击重试</p>
      </div>
    );
  } else if (type === 'noMore') {
    return (
      <div px-16px pt-16px pb-32px>
        <p pp-btn-info>没有更多了</p>
      </div>
    );
  } else if (type === 'next') {
    return (
      <div px-16px pt-16px pb-32px>
        <button pp-btn-info onClick={onClick}>
          加载更多
        </button>
      </div>
    );
  }
  return null;
};

const getKey = (pageIndex: number) => {
  return `/api/v1/items?page=${pageIndex + 1}&limit=5`;
};
export const ItemList: FC = () => {
  // 加载更多状态
  const [loadingMore, setLoadingMore] = useState(false);

  // 请求数据
  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    async (path) => {
      return new Promise<APIResponse.Items>((resolve, reject) => {
        useCommonApi()
          .get<APIResponse.Items>(path)
          .then((res) => resolve(res))
          .catch((err) => reject(err))
          .finally(() => setLoadingMore(false));
      });
    },
    {
      revalidateFirstPage: false,
    }
  );

  // 加载数据
  const loadData = (key: 'refresh' | 'next') => {
    setLoadingMore(true);
    setSize(key === 'refresh' ? size : size + 1);
  };

  // 首次加载中
  if (isLoading) {
    return <BottomBlock type='loading' />;
  } else {
    // 首次加载即失败
    if (!data && error) {
      return <BottomBlock type='error' onClick={() => loadData('refresh')} />;
    }
    // 加载成功
    else if (data) {
      return (
        <>
          <ul flex flex-col px-16px>
            {data
              ?.map((page) => page.resources)
              .flat()
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
                  b-b-solid // b-b={index === items.length - 1 ? 'transparent' : '#0000000a'}
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
            if (data.length < size) {
              // 非首次加载失败
              if (!loadingMore && error) {
                return (
                  <BottomBlock
                    type='error'
                    onClick={() => loadData('refresh')}
                  />
                );
              }
              // 非首次加载中
              else if (loadingMore) {
                return <BottomBlock type='loading' />;
              }
              return null;
            }
            // 非首次加载成功
            else {
              const { total, size: resSize, page } = data[size - 1].pager;
              // 有下一页
              return total >
                resSize * (page - 1) + data[size - 1].resources.length ? (
                <BottomBlock type='next' onClick={() => loadData('next')} />
              ) : (
                <BottomBlock type='noMore' />
              );
            }
          })()}
        </>
      );
    }
  }
  return null;
};
