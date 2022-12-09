import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from 'constants/';
import { HomePage, Services, SignInPage, SignUpPage } from 'pages';
import { MyAppointments } from '../pages/myAppointments';

export function MainRouter() {
  return (
    <Routes>
      <Route path={APP_ROUTES.MAIN} element={<HomePage />} />

      <Route path={APP_ROUTES.SIGN_IN} element={<SignInPage />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<SignUpPage />} />

      <Route path={APP_ROUTES.SERVICES} element={<Services />} />
      <Route path={APP_ROUTES.MY_APPOINTMENTS} element={<MyAppointments />} />

      <Route path="*" element={<Navigate to={APP_ROUTES.MAIN} />} />
    </Routes>
  );
}
