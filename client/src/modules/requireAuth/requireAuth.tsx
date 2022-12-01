import { useSelector } from 'react-redux';
import { useLocation, Navigate, Location } from 'react-router-dom';

import { RootState } from 'store';

export type NavigateState = {
  from: Location;
};

export function RequireAuth({ to }: { to: JSX.Element }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return to;
}
