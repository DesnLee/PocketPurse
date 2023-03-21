import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../views/Home';
import { root } from './root';
import { welcomeRoutes } from './welcomeRoutes';

export const router = createBrowserRouter([
  root,
  {
    path: '/home',
    element: <Home />,
  },
  welcomeRoutes,
]);
