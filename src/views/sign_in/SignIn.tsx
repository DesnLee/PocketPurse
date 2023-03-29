import type { FC } from 'react';
import { Icon, TopNav } from '../../components';
import logo from '../../assets/images/logo.svg';

export const SignIn: FC = () => {
  return (
    <div px-16px flex flex-col h-full gradient-primary>
      <header shrink-0 grow-0>
        <TopNav
          title='登录/注册'
          color='#303133'
          leftIcon={<Icon name='arrow_left' />}
        />
      </header>

      <main shrink-1 grow-1 py-40px flex flex-col items-center gap-56px>
        <div flex flex-col items-center gap-12px shrink-0 grow-0>
          <img w-72px h-72px src={logo} alt='logo' />
          <h1 color-primary font-bold text-28px>
            {import.meta.env.VITE_APP_NAME}
          </h1>
        </div>

        <form shrink-1 grow-1 w-full flex flex-col justify-between>
          <div flex flex-col gap-24px>
            <div>
              <span text-14px>用户名</span>
              <input type='text' />
            </div>
            <div>
              <span>验证码</span>
              <input type='text' />
            </div>
          </div>
          <button pp-btn-primary type='submit'>
            登录
          </button>
        </form>
      </main>
    </div>
  );
};
