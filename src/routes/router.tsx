import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../views/home/Home';
import { Items } from '../views/Items/Items';
import { root } from './root';
import { welcomeRoutes } from './welcomeRoutes';

export const router = createBrowserRouter([
  root,
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/items',
    element: <Items />,
  },
  welcomeRoutes,
]);
