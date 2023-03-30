import type { Partial } from '@react-spring/web';
import { create } from 'zustand';
import type { FormErrors } from '../lib/validate';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SignInData = {
  email: string;
  authCode: string;
};
interface SignInStore {
  data: SignInData;
  errors: FormErrors<SignInData>;
  setData: (data: Partial<SignInData>) => void;
  setErrors: (errors: Partial<FormErrors<SignInData>>) => void;
}

export const useSignInStore = create<SignInStore>((set) => ({
  data: {
    email: '',
    authCode: '',
  },
  errors: {
    email: [],
    authCode: [],
  },
  setData: (data) => {
    set((oldData) => ({
      ...oldData,
      data: { ...oldData.data, ...data },
    }));
  },
  setErrors: (errors) => {
    set((oldErrors) => ({ ...oldErrors, errors }));
  },
}));
