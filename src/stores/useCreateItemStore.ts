import type { Partial } from '@react-spring/web';
import { create } from 'zustand';
import type { FormErrors } from '../lib/validate';

interface EditCreateItemStore {
  data: Partial<ItemModel>;
  errors: Partial<FormErrors<ItemModel>>;
  setData: (data: Partial<ItemModel>) => void;
  setErrors: (errors: FormErrors<Partial<ItemModel>>) => void;
}

export const useCreateItemStore = create<EditCreateItemStore>((set) => ({
  data: {
    kind: 'expenses',
    tag_ids: [],
    happen_at: new Date().toISOString(),
    amount: 0,
  },
  errors: {
    kind: [],
    tag_ids: [],
    happen_at: [],
    amount: [],
  },
  setData: (data) => {
    set((oldState) => ({
      ...oldState,
      data: { ...oldState.data, ...data },
    }));
  },
  setErrors: (errors) => {
    set((oldState) => ({
      ...oldState,
      errors: { ...oldState.errors, ...errors },
    }));
  },
}));