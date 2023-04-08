import React, { useEffect } from 'react';
import type { FC } from 'react';
import { usePopup } from '../hooks';
import { useToastStore } from '../stores/useToastStore';
import { Icon } from './Icon';

interface Props {
  type: 'loading' | 'error';
  text: string;
}

const ToastElement: FC<Props> = ({ type, text }) => {
  return (
    <div
      w-96px
      aspect-square
      bg='#0006'
      rounded-12px
      flex
      flex-col
      items-center
      justify-center
      p-12px
      className={type === 'loading' ? 'pp-loading-wrapper' : ''}
    >
      <Icon name={type} color='#fff' size='36px' />
      <p mt-8px text-white text-14px text-center>
        {text}
      </p>
    </div>
  );
};

// 全局 Toast
export const Toast = () => {
  const { loading, error } = useToastStore();
  const {
    open: loadingOpen,
    close: LoadingClose,
    Popup: LoadingPopup,
  } = usePopup({
    children: <ToastElement text={loading.text} type='loading' />,
    position: 'center',
    closeOnClickMask: false,
  });
  const {
    open: errorOpen,
    close: errorClose,
    Popup: errorPopup,
  } = usePopup({
    children: <ToastElement text={error.text} type='error' />,
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
      {LoadingPopup} {errorPopup}
    </>
  );
};