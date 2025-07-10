import AppError from '../../error/app.error';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { sendImageToCloudinary } from '../utils/sendToImageCloudinary';
import { CreateUserService } from './user.service';
import httpStatus from 'http-status';
const createUsers = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const fileBuffer = req.file?.buffer;

  if (!fileBuffer) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Profile image is required');
  }

  // ✅ Upload buffer directly to Cloudinary
  const cloudinaryResponse = await sendImageToCloudinary(
    fileBuffer,
    `profile-${Date.now()}`,
  );

  const imageUrl = cloudinaryResponse.secure_url;

  const userData = {
    name,
    email,
    password,
    profileImage: imageUrl,
    role,
  };

  const result = await CreateUserService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User register successfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await CreateUserService.getAllUserIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all user retrive successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CreateUserService.getSingleUserIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single user retrive successfully',
    data: result,
  });
});
const deletedUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CreateUserService.deletedUserIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
const updatedUser = catchAsync(async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  const result = await CreateUserService.updatedUserIntoDB(_id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserController = {
  createUsers,
  getAllUser,
  getSingleUser,
  updatedUser,
  deletedUser,
};
