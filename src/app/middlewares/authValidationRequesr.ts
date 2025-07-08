import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../modules/utils/catchAsync';
import AppError from '../error/app.error';

import { TUserRole } from '../modules/user/user.interface';
import { ValidUserForLogin } from '../modules/auth/auth.utils';

const authValidateRequest = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized!');
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      console.log('Decoded Token:', decoded);
    } catch (error) {
      console.error('JWT verify error:', error);
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
    }

    const { role, email } = decoded;
    if (!email || !role) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Token Payload!');
    }

    const user = await ValidUserForLogin(email);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized!');
    }

    req.user = decoded;

    next();
  });
};

export default authValidateRequest;
