import { createApi } from '@reduxjs/toolkit/query/react';
import type { UserDataResponce, SignInUserParams, SignInUserDataResponce } from 'api/models';
import { AUTH_ROUTES } from 'constants/';
import { baseQueryWithReauth } from './baseQuery';

export const authAgent = createApi({
  reducerPath: 'authAgent',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    signUp: builder.mutation<any, any>({
      query: (data) => ({
        url: AUTH_ROUTES.SIGN_UP,
        method: 'POST',
        body: data,
      }),
    }),
    signIn: builder.mutation<SignInUserDataResponce, SignInUserParams>({
      query: (data) => ({
        url: AUTH_ROUTES.SIGN_IN,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<UserDataResponce, string>({
      query: (id) => ({
        url: AUTH_ROUTES.LOGOUT,
        method: 'POST',
        body: id,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } = authAgent;
