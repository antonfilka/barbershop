import express from 'express';
import { createError } from '../utils/errors';
import tokenService from '../utils/tokenService';

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new createError.Unauthenticated();
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      throw new createError.Unauthenticated();
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw new createError.Unauthenticated();
    }

    next();
  } catch (e) {
    throw new createError.Unauthenticated();
  }
};
