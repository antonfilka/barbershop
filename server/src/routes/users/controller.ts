import { NextFunction, Request, Response } from 'express';
import { COOKIE_MAX_AGE } from '../../constants/users';
import { ResponseLocals } from '../../interfaces';
import userService from './service';

class UsersController {
  async getUsers(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
  ): Promise<void> {
    const { limit = 100, offset = 0 } = req.query;
    const result = await userService.getUsers({
      limit: Number(limit),
      offset: Number(offset),
    });

    res.json(result);
  }

  async createUser(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<any, any, CreateUserBody>,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { name, surname, email, password } = req.body;

    const userData = await userService.createUser({ name, surname, email, password });

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
    });

    console.log(userData);

    res.json(userData);
  }

  async loginUser(
    req: Request<unknown, unknown, CreateUserBody>,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { email, password } = req.body;

    const userData = await userService.loginUser({
      email: email,
      password: password,
    });

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
    });

    res.json({ ...userData });
  }

  async logoutUser(
    req: Request<unknown, unknown, UserLogoutBody>,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { refreshToken } = req.cookies;
    const { id: userId } = req.body;

    await userService.logoutUser(userId, refreshToken);

    res.clearCookie('refreshToken');

    res.json({ isAuthenticated: false });
  }

  async refreshUserToken(
    req: Request<unknown, unknown, CreateUserBody>,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { refreshToken } = req.cookies;

    const userData = await userService.refreshUserToken(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
    });

    res.json(userData);
  }

  async deleteUser(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.body;

    await userService.deleteteUser(id);

    res.json({ message: 'User deleted' });
  }

  async getAppointments(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const result = await userService.getAppointments();

    res.json({ appointments: result });
  }

  async getMyAppointments(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.body;
    const result = await userService.getMyAppointments(id);

    res.json({ appointments: result });
  }

  async createUserAppointment(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { id, date, appointmentId } = req.body;
    await userService.createUserAppointment(id, date, appointmentId);

    res.json({ success: true });
  }
}

export default new UsersController();

interface CreateUserBody {
  name: string;
  surname: string;
  email: string;
  password: string;
  birthDate?: Date;
}
interface UserLogoutBody {
  id: string;
}
