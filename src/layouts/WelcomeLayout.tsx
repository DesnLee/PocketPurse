import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

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

  return transitions((style, i) => (
    <animated.div style={style} key={i}>
      {cacheMap.current[i]}
    </animated.div>
  ));
};
