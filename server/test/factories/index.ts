import faker from '@faker-js/faker';
import { api } from '../utils/api';

// Test factories responsible for creation of entities to make writing tests easier.
//
// For example to test GET /users there'are users in the database (to get something you need to create something).
// So easy creation may be done It's test scenario responsibility to create all necessary data to test

interface CreateUserPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
}
export const createUserPayload = (
  overrides: Partial<CreateUserPayload> = {},
): CreateUserPayload => {
  return {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  };
};

export const createUser = async (overrides: Partial<CreateUserPayload> = {}) => {
  const payload = createUserPayload(overrides);
  const res = await api.signUp().send(payload);
  expect(res.status).toBe(200);
  return res;
};

export const testFactories = {
  user: { create: createUser, createPayload: createUserPayload },
};
