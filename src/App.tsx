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

// 全局 Toast
const GlobalToast = () => {
  const { loading, error } = useToastStore();
  const {
    open: loadingOpen,
    close: LoadingClose,
    Popup: LoadingPopup,
  } = usePopup({
    children: <Toast text={loading.text} type='loading' />,
    position: 'center',
    closeOnClickMask: false,
  });
  const {
    open: errorOpen,
    close: errorClose,
    Popup: errorPopup,
  } = usePopup({
    children: <Toast text={error.text} type='error' />,
    position: 'center',
    closeOnClickMask: false,
  });

  useEffect(() => {
    loading.isOpen ? loadingOpen() : LoadingClose();
  }, [loading.isOpen]);

  useEffect(() => {
    error.isOpen ? errorOpen() : errorClose();
  }, [error.isOpen]);

  return (
    <>
      {LoadingPopup}
      {errorPopup}
    </>
  );
};
