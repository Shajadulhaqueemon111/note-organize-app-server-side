import AppError from '../../error/app.error';
import { IUser } from './user.interface';
import UserModel from './user.model';
import httpStatus from 'http-status';
const createUserIntoDB = async (payload: IUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(400, 'Email already registered');
  }
  const result = await UserModel.create(payload);
  return result;
};
const getAllUserIntoDB = async () => {
  const result = await UserModel.find();

  return result;
};
//get single user by id
const getSingleUserIntoDB = async (userId: string) => {
  const result = await UserModel.findById(userId);
  return result;
};
//user deleteing

const deletedUserIntoDB = async (userId: string) => {
  const result = await UserModel.findByIdAndDelete(userId);
  return result;
};

//user updated

const updatedUserIntoDB = async (_id: string, payload: Partial<IUser>) => {
  const result = await UserModel.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

export const CreateUserService = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
  deletedUserIntoDB,
  updatedUserIntoDB,
};
