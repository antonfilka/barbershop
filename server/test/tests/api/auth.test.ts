import '../../utils/hooks';

import { reapplyMigrations } from '../../utils/migrations';
import faker from '@faker-js/faker';
import { api } from '../../utils/api';

describe('API /auth', () => {
  beforeAll(async () => {
    await reapplyMigrations();
  });

  describe('POST /api/v1/auth/sign-up', () => {
    it('should register user', async () => {
      const body = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const signUpResponce = await api.signUp().send(body);

      expect(signUpResponce.status).toEqual(200);
    });

    it('cannot register user if its email is already in use', async () => {
      const body = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      let res = await api.signUp().send(body);

      res = await api.signUp().send(body);
      expect(res.status).toEqual(409);
    });

    it('cannot register user without name', async () => {
      const body = {};
      const res = await api.signUp().send(body);
      expect(res.status).toEqual(422);
      expect(res.body.errors[0].message).toEqual('"name" is required');
    });

    it('cannot register user without surname', async () => {
      const body = { name: faker.name.firstName() };
      const res = await api.signUp().send(body);
      expect(res.status).toEqual(422);
      expect(res.body.errors[0].message).toEqual('"surname" is required');
    });

    it('cannot register user without email', async () => {
      const body = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
      };
      const res = await api.signUp().send(body);
      expect(res.status).toEqual(422);
      expect(res.body.errors[0].message).toEqual('"email" is required');
    });

    it('cannot register user without password', async () => {
      const body = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
      };
      const res = await api.signUp().send(body);
      expect(res.status).toEqual(422);
      expect(res.body.errors[0].message).toEqual('"password" is required');
    });
  });

  describe('POST /api/v1/auth/sign-in', () => {
    it('should create user and sign in', async () => {
      const body = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const signUpResponce = await api.signUp().send(body);

      expect(signUpResponce.status).toEqual(200);

      const signInResponce = await api
        .signIn()
        .send({ email: body.email, password: body.password });

      expect(signInResponce.status).toEqual(200);
    });
  });
});
