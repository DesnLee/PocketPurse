import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Welcome2: FC = () => {
  return (
    <div>
      2 <NavLink to='/welcome/3'>下一页</NavLink>
    </div>
  );
};
