import type { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import { useItemApi } from '../api/item';
import { useUserApi } from '../api/user';
import { useTitle } from '../hooks/useTitle';
import { useLocalStorageStore } from '../stores/useLocalStorageStore';
import noDataSvg from '../assets/images/home/no_data.svg';

const EmptyView: FC = () => {
  return (
    <main
      h-full
      flex
      flex-col
      items-center
      justify-center
      px-16px
      gradient-primary
    >
      <img w-180px src={noDataSvg} alt='no data' />
      <h1 mt-32px font-bold text='#000a'>
        Welcome!
      </h1>
      <button
        w-full
        h-48px
        rounded-24px
        b-none
        bg-primary
        text-white
        text-16px
        font-bold
        mt-48px
      >
        记一笔
      </button>
    </main>
  );
};

export const Home: FC = () => {
  const { hasRead, setHasRead } = useLocalStorageStore();
  if (!hasRead) {
    setHasRead(true);
  }

  useTitle('首页');

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR('user', async () => (await useUserApi().getUser()).resource);

  const {
    data: itemsData,
    error: itemsError,
    isLoading: itemsLoading,
  } = useSWR(userData ? 'items' : null, () => useItemApi().getItems());

  if (userLoading || itemsLoading) {
    return <div>loading...</div>;
  }

  if (itemsData?.resources && itemsData.resources.length > 0) {
    return <Navigate to='/items' />;
  }

  return <EmptyView />;
};
