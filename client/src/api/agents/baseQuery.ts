import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { BASE_API, USERS_API_ROUTES } from 'constants/';
import { RootState } from 'store';
import { setAuthenticated } from 'store/reducers';

interface IData {
  accessToken?: string | undefined;
  refreshToken?: string;
  user?: any;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const state = <RootState>api.getState();
  const { id } = state.user;
  const errorData = result.error?.data as any;

  if (result.error && result.error.status === 401 && errorData?.msg === 'Unauthenticated') {
    const refreshResult = await baseQuery(USERS_API_ROUTES.REFRESH, api, extraOptions);
    if (refreshResult.data) {
      const data = refreshResult.data as IData;

      if (data?.accessToken) {
        localStorage.setItem('accessToken', data?.accessToken);

        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      result = await baseQuery(
        {
          url: USERS_API_ROUTES.LOGOUT,
          method: 'POST',
          body: { id },
        },
        api,
        extraOptions
      );
      if (result.data) api.dispatch(setAuthenticated(false));
    }
  }
  const data = result.data as IData;

  if (data?.accessToken) {
    localStorage.setItem('accessToken', data?.accessToken);
  }
  return result;
};
