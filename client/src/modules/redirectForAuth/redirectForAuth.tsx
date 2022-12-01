import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from 'store';

export function RedirectForAuth({ to }: { to: JSX.Element }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return to;
}
