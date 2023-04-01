import type { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import { useItemApi, useUserApi } from '../../api';
import { Loading } from '../../components';
import { useTitle } from '../../hooks';
import { useLocalStorageStore } from '../../stores';
import noDataSvg from '../../assets/images/home/no_data.svg';

const EmptyView: FC = () => {
  return (
    <main pp-page-wrapper items-center justify-center px-16px gradient-primary>
      <img w-180px src={noDataSvg} alt='no data' />
      <h1 mt-32px font-bold text='#000a'>
        Welcome!
      </h1>
      <button pp-btn-primary mt-48px>
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

  const { data: userData, isLoading: userLoading } = useSWR('user', () =>
    useUserApi().getUser()
  );

  const { data: itemsData, isLoading: itemsLoading } = useSWR(
    userData ? 'items' : null,
    () => useItemApi().getItems()
  );

  if (userLoading || itemsLoading) {
    return <Loading />;
  }

  if (itemsData?.resources && itemsData.resources.length > 0) {
    return <Navigate to='/items' />;
  }

  return <EmptyView />;
};
