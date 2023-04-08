import type { FC } from 'react';
import { Navigate, useLocation, useRouteError } from 'react-router-dom';
import { ErrorNoData, ErrorUnauthorized } from '../vars/errors';

export const ErrorNavigate: FC = () => {
  const error = useRouteError();
  const { pathname, search } = useLocation();

  if (error instanceof ErrorUnauthorized) {
    const redirect = encodeURIComponent(`${pathname}${search}`);
    return <Navigate to={`/sign_in?redirect=${redirect}`} />;
  } else if (error instanceof ErrorNoData) {
    return <Navigate to='/home' />;
  }
  return null;
};
