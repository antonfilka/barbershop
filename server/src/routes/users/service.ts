import {
  AppointmentsEntity,
  TokenEntity,
  UserEntity,
  UsersAppointmentsEntity,
} from '../../db/entities';
import { UserCreationAttributes } from '../../db/entities/userEntity';
import { ArrayResponse, Pagination } from '../../interfaces';
import { UserLoginAttributes, UserUpdateAttributes } from '../../interfaces/users';
import { createError } from '../../utils/errors';
import bcrypt from 'bcryptjs';
import tokenService from '../../utils/tokenService';
import { SALT_ROUNDS } from '../../constants/users';
import { dbContext } from '../../db/dbContext';

class UserService {
  async getUsers(options: Partial<Pagination> = {}): Promise<ArrayResponse<UserEntity>> {
    const { limit = 100, offset = 0 } = options;

    const result = await UserEntity.findAndCountAll({
      limit,
      offset,
    });

    return {
      results: result.rows,
      metadata: {
        count: result.count,
        limit,
        offset,
      },
    };
  }

  async createUser(data: UserCreationAttributes) {
    const isInUse = await UserEntity.count({ where: { email: data.email } });

    if (isInUse) throw new createError.ConflictError();

    const hashPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const tokens = tokenService.generateTokens({
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: undefined,
    });

    const userCreateData = {
      ...data,
      password: hashPassword,
    };

    const result = await UserEntity.create(userCreateData);

    await tokenService.saveToken(result.id, tokens.refreshToken);
    console.log('first');

    return { ...tokens, user: result };
  }

  async loginUser(data: UserLoginAttributes) {
    const user = await UserEntity.findOne({
      where: { email: data.email },
    });

    if (!user) throw new createError.LoginEmailConflictError();

    const isPassEquals = await bcrypt.compare(data.password, user.password);
    if (!isPassEquals) throw new createError.LoginPasswordConflictError();

    const tokens = tokenService.generateTokens({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logoutUser(userId: string, refreshToken: string) {
    await tokenService.removeToken(userId, refreshToken);
  }

  async refreshUserToken(refreshToken: string) {
    if (!refreshToken) throw new createError.Unauthenticated();

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw new createError.Unauthenticated();

    const user = await UserEntity.findOne({
      where: { email: userData.email },
    });

    if (!user) throw new createError.Unauthenticated();

    const tokens = tokenService.generateTokens({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async updateUser(id: string, data: UserUpdateAttributes) {
    const { email } = data;
    if (!email) {
      const user = await UserEntity.update({ ...data }, { where: { id } });

      return user;
    }
    const userHasEmail = await UserEntity.findOne({ where: { email } });
    if (userHasEmail) throw new createError.ConflictEmail();

    const user = await UserEntity.update({ ...data }, { where: { id } });

    return user;
  }

  async deleteteUser(id: string) {
    const transaction = await dbContext.transaction();

    try {
      await UserEntity.destroy({ where: { id }, transaction });
      await TokenEntity.destroy({ where: { userId: id }, transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
  async getMyAppointments(id: number) {
    const result = await UsersAppointmentsEntity.findAll({
      where: { userId: id },
      include: {
        model: AppointmentsEntity,
        as: 'appointment',
      },
    });

    return result;
  }
  async getAppointments() {
    const result = await AppointmentsEntity.findAll();

    return result;
  }

  async createUserAppointment(id: number, date: Date, appointmentId: number) {
    await UsersAppointmentsEntity.create({ userId: id, appointmentId, date });
  }
}

export default new UserService();
