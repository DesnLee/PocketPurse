import { WelcomeLayout } from '../layouts';
import { Welcome1, Welcome2, Welcome3, Welcome4 } from '../views/welcome';

export const welcomeRoutes = {
  path: 'welcome',
  element: <WelcomeLayout />,
  children: [
    {
      path: '1',
      element: <Welcome1 />,
    },
    {
      path: '2',
      element: <Welcome2 />,
    },
    {
      path: '3',
      element: <Welcome3 />,
    },
    {
      path: '4',
      element: <Welcome4 />,
    },
  ],
};
