import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div h-full>
      <Outlet />
    </div>
  );
};
export default MainLayout;
