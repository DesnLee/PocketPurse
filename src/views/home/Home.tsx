import type { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { useApi } from '../../api/useApi';
import { useTitle } from '../../hooks';
import { useLocalStorageStore } from '../../stores';
import noDataSvg from '../../assets/images/home/no_data.svg';

const EmptyView: FC = () => {
  const nav = useNavigate();
  return (
    <main pp-page-wrapper items-center justify-center px-16px gradient-primary>
      <img w-180px src={noDataSvg} alt='no data' />
      <h1 mt-32px font-bold text='#000a'>
        Welcome!
      </h1>
      <button pp-btn-primary mt-48px onClick={() => nav('/items/new')}>
        记一笔
      </button>
    </main>
  );
};

export const Home: FC = () => {
  const { api } = useApi();
  const { hasRead, setHasRead } = useLocalStorageStore();
  if (!hasRead) {
    setHasRead(true);
  }

  useTitle('首页');

  const { data: userData, isLoading: userLoading } = useSWR('user', () =>
    api.user.getUser()
  );

  const { data: itemsData, isLoading: itemsLoading } = useSWR(
    userData?.data ? 'items' : null,
    () => api.item.getItems()
  );

  if (userLoading || itemsLoading) return null;
  if (itemsData?.data.resources && itemsData.data.resources.length > 0) {
    return <Navigate to='/items' />;
  }

  return <EmptyView />;
};
