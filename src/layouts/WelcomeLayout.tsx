import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const nextMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/1',
};

export const WelcomeLayout: FC = () => {
  const { pathname } = useLocation();
  const cacheMap = useRef<Record<string, ReactNode>>({});
  cacheMap.current[pathname] = useOutlet();

  const transitions = useTransition(pathname, {
    from: {
      opacity: pathname === '/welcome/1' ? 1 : 0,
      transform: `translate3d(${pathname === '/welcome/1' ? 0 : 100}%, 0, 0px)`,
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%, 0, 0px)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(-50%, 0, -40px)',
    },
    config: { duration: 300 },
  });

  return (
    <div h-full flex flex-col items-center gradient-primary>
      <header flex shrink-0 items-center justify-center flex-col h='1/4'>
        <img w-44px aspect-square src={logo} alt='PocketPurse' />
        <h1 mt-8px text-primary font-bold>
          PocketPurse
        </h1>
      </header>

      {transitions((style, i) => (
        <animated.div style={style} key={i} grow-1 flex shrink-1 items-center>
          {cacheMap.current[i]}
        </animated.div>
      ))}

      <footer flex shrink-0 flex-col items-center w-full h='1/6'>
        <Link
          text-center
          h-44px
          leading-44px
          bg-primary
          text-white
          font-bold
          rounded-22px
          w='1/2'
          text-16px
          to={nextMap[pathname]}
        >
          {pathname === '/welcome/4' ? '进入' : '下一页'}
        </Link>

        {pathname === '/welcome/4' ? null : (
          <Link
            text-14px
            p-8px
            mt-12px
            className='text-#0005'
            to='/welcome/xxx'
          >
            跳过
          </Link>
        )}
      </footer>
    </div>
  );
};
