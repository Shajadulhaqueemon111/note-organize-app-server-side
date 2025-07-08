import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/valiateRequest';
import { UserZodValidationSchema } from './user.zodValidation';

const route = express.Router();

route.post(
  '/create-user',
  validateRequest(UserZodValidationSchema.createUserZodSchema),
  UserController.createUsers,
);
route.get('/', UserController.getAllUser);
route.get('/:id', UserController.getSingleUser);
route.patch(
  '/:_id',
  validateRequest(UserZodValidationSchema.updatedUserZodSchema),
  UserController.updatedUser,
);
route.delete('/:id', UserController.deletedUser);

export const userRoute = route;
