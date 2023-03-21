import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { ErrorPage } from '../components/ErrorPage';
import { hasReadWelcomeKey } from '../vars/localStorage';
export const root: RouteObject = {
  path: '/',
  errorElement: <ErrorPage />,
  // 如果已经阅读过欢迎页，就跳转到首页，否则跳转到欢迎页
  loader: () => {
    const hasRead = localStorage.getItem(hasReadWelcomeKey);
    if (hasRead === '1') {
      return redirect('/home');
    } else {
      return redirect('/welcome/1');
    }
  },
};
