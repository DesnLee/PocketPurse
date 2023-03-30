import type { FC, FormEvent } from 'react';
import { Icon, TopNav } from '../../components';
import logo from '../../assets/images/logo.svg';
import { Input } from '../../components/FormInput/Input';
import { useSignInStore } from '../../stores';

export const SignIn: FC = () => {
  const { data, setData } = useSignInStore();

  const onClickSendAuthCode = (e: MouseEvent) => {
    e.preventDefault();
    console.log('1');
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div px-16px flex flex-col h-full gradient-primary>
      <header shrink-0 grow-0>
        <TopNav title='登录/注册' leftIcon={<Icon name='arrow_left' />} />
      </header>

      <main shrink-1 grow-1 py-40px flex flex-col items-center gap-56px>
        <div flex flex-col items-center gap-12px shrink-0 grow-0>
          <img w-72px h-72px src={logo} alt='logo' />
          <h1 color-primary font-bold text-28px>
            {import.meta.env.VITE_APP_NAME}
          </h1>
        </div>

        <form
          shrink-1
          grow-1
          w-full
          flex
          flex-col
          justify-between
          onSubmit={onSubmit}
        >
          <div flex flex-col gap-y-24px>
            <Input
              label={<Icon name='mail' color='#0004' />}
              type='email'
              labelWidth='22px'
              placeholder='请输入邮箱'
              onChange={(email) => setData({ email })}
            />
            <Input
              label={<Icon name='shield_cat' color='#0004' />}
              labelWidth='24px'
              placeholder='请输入验证码'
              onChange={(authCode) => setData({ authCode })}
              rightBtn={
                <button
                  className='pp-btn-secondary w-32vw rounded-8px'
                  onClick={onClickSendAuthCode}
                >
                  获取验证码
                </button>
              }
            />
          </div>
          <button pp-btn-primary type='submit'>
            登录
          </button>
        </form>
      </main>
    </div>
  );
};
