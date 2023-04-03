import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../views/home/Home';
import { Items } from '../views/Items/Items';
import { NewItem } from '../views/newItem/NewItem';
import { NewTag } from '../views/newTag/NewTag';
import { SignIn } from '../views/sign_in/SignIn';
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
  {
    path: '/items/new',
    element: <NewItem />,
  },
  {
    path: '/sign_in',
    element: <SignIn />,
  },
  {
    path: '/charts',
    element: <div>charts</div>,
  },
  {
    path: '/export',
    element: <div>export</div>,
  },
  {
    path: '/tags',
    element: <div>tags</div>,
  },
  {
    path: '/tags/new',
    element: <NewTag />,
  },
  {
    path: '/reminder',
    element: <div>reminder</div>,
  },
  welcomeRoutes,
]);
