import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Welcome3: FC = () => {
  return (
    <div>
      3 <NavLink to='/welcome/4'>下一页</NavLink>
    </div>
  );
};
