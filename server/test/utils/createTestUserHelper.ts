import { UserEntity } from '../../src/db/entities';
import { SALT_ROUNDS } from '../../src/constants/users';
import { Roles } from '../../src/interfaces/users';
import tokenService from '../../src/utils/tokenService';
import bcrypt from 'bcryptjs';

export const createTestUserHelper = async () => {
  const adminData = {
    name: 'admin',
    surname: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123',
  };

  const hashPassword = await bcrypt.hash(adminData.password, SALT_ROUNDS);

  const tokens = tokenService.generateTokens({
    name: adminData.name,
    surname: adminData.surname,
    email: adminData.email,
    role: Roles.admin,
  });

  const createdAdmin = await UserEntity.create({
    ...adminData,
    password: hashPassword,
  });

  await tokenService.saveToken(createdAdmin.id, tokens.refreshToken);

  return {
    accessToken: tokens.accessToken,
    email: createdAdmin.email,
    password: adminData.password,
    id: createdAdmin.id,
  };
};
