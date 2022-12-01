import { createApi } from '@reduxjs/toolkit/query/react';
import { USERS_API_ROUTES, USER_DATA_TAG } from 'constants/';
import { baseQueryWithReauth } from './baseQuery';

export const userAgent = createApi({
  reducerPath: 'userAgent',
  baseQuery: baseQueryWithReauth,
  tagTypes: [USER_DATA_TAG],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getUsers: builder.query<any, any>({
      query: ({ offset, limit }) => ({
        url: USERS_API_ROUTES.GET_ALL,
        params: { offset, limit },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userAgent;
