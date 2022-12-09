export const BASE_API = 'http://localhost:3000/api/v1';

export const AUTH_ROUTES = {
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  APPOINTMENTS: '/auth/appointments',
  CREATE_APPOINTMENT: '/auth/appointment',
  MY_APPOINTMENTS: '/auth/my-appointments',
};

export const USERS_API_ROUTES = {
  GET_ALL: '/users',
  GET_USER_DATA: '/users',
  SIGN_UP: AUTH_ROUTES.SIGN_UP,
  SIGN_IN: AUTH_ROUTES.SIGN_IN,
  LOGOUT: AUTH_ROUTES.LOGOUT,
  REFRESH: AUTH_ROUTES.REFRESH,
};

export const USER_DATA_TAG = 'UserData';
