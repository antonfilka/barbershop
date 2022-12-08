import Jwt from 'jsonwebtoken';
import { TokenEntity } from '../db/entities';
import { UserJwtPayload, UserJwtResetPayload } from '../interfaces/users';

class TokenService {
  generateTokens(payload: UserJwtPayload) {
    const accessToken = Jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: '30m',
    });

    const refreshToken = Jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: '5d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  generateResetToken(payload: UserJwtResetPayload) {
    const resetToken = Jwt.sign(payload, process.env.JWT_RESET_SECRET as string, {
      expiresIn: '60m',
    });

    return resetToken;
  }

  validateAccessToken(token: string) {
    try {
      const userData = Jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): UserJwtPayload | null {
    try {
      const userData = <UserJwtPayload>Jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  validateResetToken(token: string) {
    try {
      const userData = Jwt.verify(token, process.env.JWT_RESET_SECRET as string);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    await TokenEntity.create({ userId: userId, refreshToken: refreshToken });
    console.log('ddd');
  }

  async removeToken(userId: string, refreshToken: string) {
    let destroyOptions;
    if (!refreshToken) {
      destroyOptions = { where: { userId } };
    } else {
      destroyOptions = { where: { refreshToken } };
    }

    await TokenEntity.destroy(destroyOptions);
  }

  async findToken(refreshToken: string) {
    const token = await TokenEntity.findOne({ where: { refreshToken: refreshToken } });

    return token?.refreshToken;
  }
}

export default new TokenService();
