import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const WelcomeLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
