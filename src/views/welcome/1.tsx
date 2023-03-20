import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Welcome1: FC = () => {
  return (
    <div>
      1 <NavLink to='/welcome/2'>下一页</NavLink>
    </div>
  );
};
