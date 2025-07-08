import AppError from '../../error/app.error';
import UserModel from '../user/user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
export const ValidUserForLogin = async (email: string) => {
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user not found for database');
  }
  return user;
};

export const checkPassword = async (
  givenPassword: string,
  savePassword: string,
) => {
  console.log(givenPassword);
  console.log(savePassword);
  const isMatched = await bcrypt.compare(givenPassword, savePassword);
  console.log(isMatched);
  if (!isMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'password does not matched');
  }

  return isMatched;
};
