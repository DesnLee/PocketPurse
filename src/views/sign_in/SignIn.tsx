import type { FC, MouseEventHandler } from 'react';
import { Form, Icon, Input, TopNav, TopNavTransparent } from '../../components';
import logo from '../../assets/images/logo.svg';
import { request } from '../../lib/request';
import { hasError, validate } from '../../lib/validate';
import type { Rules } from '../../lib/validate';
import { useSignInStore } from '../../stores';

const rules: Rules<SignInData> = [
  {
    key: 'email',
    type: 'required',
    message: '请输入邮箱地址',
  },
  {
    key: 'email',
    type: 'pattern',
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    message: '邮箱地址格式不正确',
  },
  {
    key: 'authCode',
    type: 'required',
    message: '请输入验证码',
  },
  {
    key: 'authCode',
    type: 'length',
    min: 6,
    max: 6,
    message: '验证码必须是6位数字',
  },
];

export const SignIn: FC = () => {
  const { data, errors, setData, setErrors } = useSignInStore();

  const onClickSendAuthCode: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  const checkForm = (key?: keyof typeof data) => {
    let error;
    if (key) {
      error = validate(
        { [key]: data[key] },
        rules.filter((rule) => rule.key === key)
      );
    } else {
      error = validate(data, rules);
    }
    setErrors(error);
  };

  const onSubmit = () => {
    checkForm();
    if (hasError(errors)) {
    } else {
      request.post('/api/v1/sign_in', data);
    }
  };

  return (
    <div pp-page-wrapper gradient-primary>
      <TopNavTransparent>
        <TopNav title='登录/注册' leftIcon={<Icon name='arrow_left' />} />
      </TopNavTransparent>

      <main px-16px shrink-1 grow-1 py-40px flex flex-col items-center gap-56px>
        <div flex flex-col items-center gap-12px shrink-0 grow-0>
          <img w-72px h-72px src={logo} alt='logo' />
          <h1 font-bold text-28px color='[var(--color-primary)]'>
            {import.meta.env.VITE_APP_NAME}
          </h1>
        </div>

        <Form
          className='shrink-1 grow-1 w-full flex flex-col justify-between'
          onSubmit={onSubmit}
        >
          <div flex flex-col>
            <Input
              label={<Icon name='mail' color='#0004' />}
              type='email'
              labelWidth='22px'
              placeholder='请输入邮箱'
              onChange={(email) => setData({ email })}
              onBlur={() => checkForm('email')}
              errors={errors.email}
              clearable
            />
            <Input
              label={<Icon name='shield_cat' color='#0004' />}
              type='number'
              labelWidth='24px'
              placeholder='请输入验证码'
              onChange={(authCode) => setData({ authCode })}
              onBlur={() => checkForm('authCode')}
              errors={errors.authCode}
              clearable
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
          <button
            pp-btn-primary
            type='submit'
            disabled={
              hasError(errors) || data.email === '' || data.authCode === ''
            }
          >
            登录
          </button>
        </Form>
      </main>
    </div>
  );
};
