import axios from 'axios';
import type { FC } from 'react';
import useSWR from 'swr';
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

  const { data: userData, error: userError } = useSWR(
    '/api/v1/user',
    (path) => {
      return axios.get(path).then((res) => res.data);
    }
  );

  const { data: itemsData, error: itemsError } = useSWR(
    userData ? '/api/v1/items' : null,
    (path) => {
      return axios.get(path).then((res) => res.data);
    }
  );

  return <EmptyView />;
};
