import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../views/home/Home';
import { Items } from '../views/Items/Items';
import { NewItem } from '../views/newItem/NewItem';
import { Statistics } from '../views/statistics/Statistics';
import { EditTag } from '../views/tags/EditTag';
import { SignIn } from '../views/sign_in/SignIn';
import { root } from './root';
import { welcomeRoutes } from './welcomeRoutes';

export const router = createBrowserRouter([
  root,
  welcomeRoutes,
  {
    path: '/sign_in',
    element: <SignIn />,
  },
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
    path: '/statistics',
    element: <Statistics />,
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
    element: <EditTag type='new' title='新建标签' />,
  },
  {
    path: '/tags/edit/:id',
    element: <EditTag type='edit' title='标签详情' />,
  },
  {
    path: '/reminder',
    element: <div>reminder</div>,
  },
]);
