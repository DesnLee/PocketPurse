import { create } from 'zustand';

type ToastType = 'loading' | 'error';
interface ToastStore {
  loading: {
    text: string;
    isOpen: boolean;
  };
  error: {
    text: string;
    isOpen: boolean;
  };
  openToast: (options: { type: ToastType; text?: string }) => void;
  closeToast: (type: ToastType) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  loading: {
    text: '加载中...',
    isOpen: false,
  },
  error: {
    text: '出错了',
    isOpen: false,
  },
  closeToast: (type) => {
    set((oldState) => ({
      ...oldState,
      [type]: { ...oldState[type], isOpen: false },
    }));
  },
  openToast: ({ type, text }) => {
    set((oldState) => ({
      ...oldState,
      [type]: {
        ...oldState[type],
        isOpen: true,
        text: text || oldState[type].text,
      },
    }));
  },
}));
