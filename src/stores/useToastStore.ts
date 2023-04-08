import { create } from 'zustand';

interface ToastStore {
  text: string;
  type: 'error' | 'loading';
  isOpen: boolean;
  setToast: (isOpen: boolean, type?: ToastStore['type'], text?: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  text: '加载中...',
  type: 'loading',
  isOpen: false,
  setToast: (isOpen, type, text) => {
    set((oldState) => ({
      isOpen,
      type: type || oldState.type,
      text: text || oldState.text,
    }));
  },
}));
