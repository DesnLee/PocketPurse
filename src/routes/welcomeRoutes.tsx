import type { RouteObject } from 'react-router-dom';
import { WelcomeLayout } from '../layouts';
import { Welcome } from '../views/Welcome';

export const welcomeRoutes: RouteObject = {
  path: 'welcome',
  element: <WelcomeLayout />,
  children: [
    {
      path: '1',
      element: <Welcome num='1' />,
    },
    {
      path: '2',
      element: <Welcome num='2' />,
    },
    {
      path: '3',
      element: <Welcome num='3' />,
    },
    {
      path: '4',
      element: <Welcome num='4' />,
    },
  ],
};
