import React, { useEffect } from 'react';
import type { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Loading } from './components';
import { usePopup } from './hooks';
import { router } from './routes/router';
import { useToastStore } from './stores/useToastStore';

export const App: FC = () => {
  return (
    <div h='100%'>
      <GlobalLoading />
      <RouterProvider router={router} />
    </div>
  );
};

// 全局 loading
const GlobalLoading = () => {
  const { isLoading } = useToastStore();
  const { open, close, Popup } = usePopup({
    children: <Loading />,
    position: 'center',
  });
  useEffect(() => {
    isLoading ? open() : close();
  }, [isLoading]);
  return Popup;
};
