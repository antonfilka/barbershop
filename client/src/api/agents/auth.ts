import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  UserDataResponce,
  SignInUserParams,
  SignInUserDataResponce,
  GetAllAppointsResponce,
  CreateAppointment,
  GetMyAppointsResponce,
} from 'api/models';
import { AUTH_ROUTES } from 'constants/';
import { baseQueryWithReauth } from './baseQuery';

const appointment = 'Appointment';

export const authAgent = createApi({
  reducerPath: 'authAgent',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 30,
  tagTypes: [appointment],
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
    getAppointments: builder.query<GetAllAppointsResponce, any>({
      query: () => ({
        url: AUTH_ROUTES.APPOINTMENTS,
        method: 'GET',
      }),
    }),
    getMyAppointments: builder.query<GetMyAppointsResponce, { id: string }>({
      query: (data) => ({
        url: AUTH_ROUTES.MY_APPOINTMENTS,
        method: 'POST',
        body: data,
      }),
      providesTags: [appointment],
    }),
    createAppointment: builder.mutation<GetAllAppointsResponce, CreateAppointment>({
      query: (data) => ({
        url: AUTH_ROUTES.CREATE_APPOINTMENT,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [appointment],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useGetMyAppointmentsQuery,
} = authAgent;
