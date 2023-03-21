import { animated, useTransition } from '@react-spring/web';
import { useEffect, useMemo, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { useSwipe } from '../hooks/useSwipe';

// 下一页映射表
const nextMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
};
const lastMap: Record<string, string> = {
  '/welcome/4': '/welcome/3',
  '/welcome/3': '/welcome/2',
  '/welcome/2': '/welcome/1',
};

export const WelcomeLayout: FC = () => {
  const { pathname } = useLocation();
  const cacheMap = useRef<Record<string, ReactNode>>({});
  cacheMap.current[pathname] = useOutlet();

  const nav = useNavigate();
  const animeRef = useRef<HTMLDivElement>(null);

  // useSwipe 钩子获取滑动方向
  const { direction } = useSwipe(animeRef, {
    onTouchStart: (e) => e.preventDefault(),
  });
  // 滑动方向改变时，进行跳转或者返回
  const isAnimating = useRef(false);
  useEffect(() => {
    if (isAnimating.current) return;
    if (direction === 'left') {
      // 如果不是最后一页才可以使用手势
      if (pathname !== '/welcome/4') {
        nav(nextMap[pathname], { replace: true });
      }
    } else if (direction === 'right') {
      // 如果不是第一页才可以使用手势
      if (pathname !== '/welcome/1') {
        nav(lastMap[pathname], { replace: true });
      }
    }
  }, [direction]);

  // 根据滑动方向，获取不同的动画配置
  const config = useRef({});
  const getTransitionConfig = useMemo(() => {
    if (direction && ['left', 'right'].includes(direction)) {
      const controller = direction === 'left' ? 1 : -1;
      config.current = {
        from: {
          opacity: 0,
          transform: `translate3d(${controller * 100}%, 0, 0)`,
        },
        leave: {
          opacity: 0,
          transform: `translate3d(${controller * -50}%, 0, 0)`,
        },
      };
    }
    return config.current;
  }, [direction]);

  const transitions = useTransition(pathname, {
    ...getTransitionConfig,
    enter: {
      opacity: 1,
      transform: 'translate3d(0%, 0, 0)',
    },
    config: { duration: 300 },
    onStart: () => {
      isAnimating.current = true;
    },
    onRest: () => {
      isAnimating.current = false;
    },
  });

  return (
    <div h-full flex flex-col items-center gradient-primary>
      <header flex shrink-0 items-center justify-center flex-col h='1/4'>
        <img w-44px aspect-square src={logo} alt='PocketPurse' />
        <h1 mt-8px text-primary font-bold>
          PocketPurse
        </h1>
      </header>

      <main ref={animeRef} relative grow-1 shrink-1 w-full overflow-hidden>
        {transitions((style, i) => (
          <animated.div
            style={style}
            key={i}
            flex
            items-center
            justify-center
            absolute
            w-full
            h-full
          >
            {cacheMap.current[i]}
          </animated.div>
        ))}
      </main>

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
          <Link text-14px p-8px mt-12px className='text-#0005' to='/home'>
            跳过
          </Link>
        )}
      </footer>
    </div>
  );
};
