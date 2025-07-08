/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../error/app.error';
import { TLogin } from './auth.interface';
import httpStatus from 'http-status';
import { checkPassword, ValidUserForLogin } from './auth.utils';
import { createToken } from './auth.jwtutils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
const LoginUser = async (payload: TLogin) => {
  const { password, email } = payload;

  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user email does not exist');
  }
  if (!password) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user password does not exist');
  }

  const user = await ValidUserForLogin(email);

  const isPasswordMatched = await checkPassword(password, user.password);

  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'user password does not matched',
    );
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user?.email,
    role: user?.role,
    profileImage: user.profileImage,
    status: user.status || 'unblock',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as unknown as number,
  );
  console.log(accessToken);
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refress_secreet as string,
    config.jwt_refress_expires_in as unknown as number,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not Authorized !');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refress_secreet as string,
  ) as JwtPayload;
  console.log('Decoded Token:', decoded);

  const { role, email } = decoded;
  console.log(role, email);
  if (!role || !email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid toke payload');
  }

  const user = await ValidUserForLogin(email);
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    status: user.status || 'blocked',
  };
  console.log('JWT Payload for Refresh Token:', jwtPayload);

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as unknown as number,
  );
  return {
    accessToken,
  };
};
const logoutUser = async (res: any) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return {
    message: 'Successfully logged out',
  };
};
export const authService = {
  LoginUser,
  refreshToken,
  logoutUser,
};
