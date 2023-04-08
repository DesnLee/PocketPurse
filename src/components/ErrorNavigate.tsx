import type { FC } from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import { ErrorNoData, ErrorUnauthorized } from '../vars/errors';

export const ErrorNavigate: FC = () => {
  const error = useRouteError();

  if (error instanceof ErrorUnauthorized) {
    return <Navigate to='/sign_in' />;
  } else if (error instanceof ErrorNoData) {
    return <Navigate to='/home' />;
  }
  return null;
};
