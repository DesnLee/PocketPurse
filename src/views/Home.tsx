import type { FC } from 'react';
import { useLocalStorageStore } from '../stores/useLocalStorageStore';

export const Home: FC = () => {
  const { hasRead, setHasRead } = useLocalStorageStore();
  if (!hasRead) setHasRead(true);

  return (
    <>
      <div>Home</div>
    </>
  );
};
