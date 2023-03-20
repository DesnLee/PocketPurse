import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Welcome4: FC = () => {
  return (
    <div>
      4 <NavLink to='/welcome/xxx'>下一页</NavLink>
    </div>
  );
};
