import { UserEntity } from '../../src/db/entities';
import { SALT_ROUNDS } from '../../src/constants/users';
import { Roles } from '../../src/interfaces/users';
import tokenService from '../../src/utils/tokenService';
import bcrypt from 'bcryptjs';

export const createManagerHelper = async () => {
  const managerData = {
    name: 'manager',
    surname: 'manager',
    email: 'manager@gmail.com',
    password: 'manager123',
  };

  const hashPassword = await bcrypt.hash(managerData.password, SALT_ROUNDS);

  const tokens = tokenService.generateTokens({
    name: managerData.name,
    surname: managerData.surname,
    email: managerData.email,
    role: Roles.manager,
  });

  const createdManager = await UserEntity.create({
    ...managerData,
    password: hashPassword,
  });

  await tokenService.saveToken(createdManager.id, tokens.refreshToken);

  return {
    accessToken: tokens.accessToken,
    id: createdManager.id,
  };
};
