import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}
export const UserInfo: FC<Props> = ({ className }) => {
  return (
    <Link
      to='/sign_in'
      className={className}
      pb-24px
      b-b
      flex
      gap-12px
      items-center
    >
      <div w-48px h-48px rounded-24px overflow-hidden b-2px b-solid b-c-primary>
        <img
          w-full
          h-full
          src='https://avatars.githubusercontent.com/u/12668546?v=4'
          alt=''
        />
      </div>
      <div>
        <h1 text-18px font-bold color='#303133'>
          未登录用户
        </h1>
        <p text-14px color='#909399'>
          点击登录
        </p>
      </div>
    </Link>
  );
};
