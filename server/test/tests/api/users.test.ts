import '../../utils/hooks';
import { reapplyMigrations } from '../../utils/migrations';
import { api } from '../../utils/api';
import faker from '@faker-js/faker';
import { createTestUserHelper } from '../../utils/createTestUserHelper';

describe('API /users', () => {
  const adminData = createTestUserHelper();

  beforeAll(async () => {
    await reapplyMigrations();
  });

  describe('GET /api/v1/users', () => {
    it('should get users', async () => {
      // creating some users

      const adminAccessToken = (await adminData).accessToken;

      const res = await api.getUsers().set('Authorization', 'Bearer ' + adminAccessToken);

      expect(res.status).toEqual(200);
    });
  });

  describe('POST /api/v1/auth/sign-up', () => {
    it('should create user', async () => {
      const body = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const createUserResponce = await api.signUp().send(body);

      expect(createUserResponce.status).toEqual(200);

      const adminAccessToken = (await adminData).accessToken;

      const getUserResponce = await api
        .getUser(createUserResponce.body.user.id)
        .set('Authorization', 'Bearer ' + adminAccessToken);

      expect(getUserResponce.status).toEqual(404);
    });

    it('cannot create user without name', async () => {
      const body = {};
      const res = await api.signUp().send(body);
      expect(res.status).toEqual(422);
    });
  });
});
