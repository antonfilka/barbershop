import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from 'constants/';
import { RequireAuth, RedirectForAuth } from 'modules';
import { HomePage, SignInPage, SignUpPage } from 'pages';

export function MainRouter() {
  return (
    <Routes>
      <Route path={APP_ROUTES.MAIN} element={<RequireAuth to={<HomePage />} />} />

      <Route path={APP_ROUTES.SIGN_IN} element={<RedirectForAuth to={<SignInPage />} />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<RedirectForAuth to={<SignUpPage />} />} />

      <Route path="*" element={<Navigate to={APP_ROUTES.MAIN} />} />
    </Routes>
  );
}
