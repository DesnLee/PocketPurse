import { create } from 'zustand';

interface Data {
  email: string;
  authCode: string;
}
interface SignInStore {
  data: Data;
  setData: (data: Partial<Data>) => void;
}

export const useSignInStore = create<SignInStore>((set, get) => ({
  data: {
    email: '',
    authCode: '',
  },
  setData: (data) => {
    set(() => ({
      data: { ...get().data, ...data },
    }));
  },
}));
