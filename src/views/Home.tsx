import type { FC } from 'react';
import { hasReadWelcomeKey } from '../vars/localStorage';

export const Home: FC = () => {
  localStorage.setItem(hasReadWelcomeKey, '1');

  return <div>Home</div>;
};
