import type { FC } from 'react';
import { Icon, TopNav } from '../../components';

export const SignIn: FC = () => {
  return (
    <>
      <div px-16px>
        <TopNav
          title='登录/注册'
          color='#303133'
          leftIcon={<Icon name='arrow_left' />}
        />
      </div>
      <main></main>
    </>
  );
};
