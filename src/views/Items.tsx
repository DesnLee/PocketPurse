import type { FC } from 'react';
import { useTitle } from '../hooks/useTitle';

export const Items: FC = () => {
  useTitle('项目');

  return <div>items</div>;
};
