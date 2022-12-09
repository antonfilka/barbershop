import { request } from './request';

export const api = {
  getUsers: () => request.get('/api/v1/users'),
  getUser: (id: string) => request.get(`/api/v1/users/${id}`),
  signUp: () => request.post('/api/v1/auth/sign-up'),
  signIn: () => request.post('/api/v1/auth/sign-in'),
};
