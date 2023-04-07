import { create } from 'zustand';

interface ToastStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export const useToastStore = create<ToastStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
}));
