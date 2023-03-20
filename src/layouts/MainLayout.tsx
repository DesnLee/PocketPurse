import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = () => {
  return (
    <div h-full>
      <Outlet />
    </div>
  );
};
