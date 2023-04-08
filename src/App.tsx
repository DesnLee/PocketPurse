import React, { useEffect } from 'react';
import type { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toast } from './components';
import { usePopup } from './hooks';
import { router } from './routes/router';
import { useToastStore } from './stores/useToastStore';

export const App: FC = () => {
  return (
    <div h='100%'>
      <GlobalToast />
      <RouterProvider router={router} />
    </div>
  );
};

// 全局 loading
const GlobalToast = () => {
  const { isOpen, type, text } = useToastStore();
  const { open, close, Popup } = usePopup({
    children: <Toast text={text} type={type} />,
    position: 'center',
  });
  useEffect(() => {
    isOpen ? open() : close();
  }, [isOpen]);
  return Popup;
};
