import express from 'express';
import validateRequest from '../../middlewares/valiateRequest';
import { NoteZodValidationSchema } from './create.note.zodvalidation';
import { createNoteController } from './note.controller';
import authValidateRequest from '../../middlewares/authValidationRequesr';
import { USER_ROLE } from '../user/user.constant';
import { upload } from '../utils/sendToImageCloudinary';

const route = express.Router();

route.post(
  '/create-note',
  upload.single('image'),
  validateRequest(NoteZodValidationSchema.createNoteZodSchema),
  createNoteController.createNote,
);
route.get(
  '/',
  authValidateRequest(USER_ROLE.user),
  createNoteController.getAllNote,
);
route.get(
  '/:id',
  authValidateRequest(USER_ROLE.user),
  createNoteController.getSingleNote,
);
route.patch(
  '/:_id',
  authValidateRequest(USER_ROLE.user),
  upload.single('image'),
  validateRequest(NoteZodValidationSchema.updateNoteZodSchema),
  createNoteController.updateNote,
);

route.delete(
  '/:_id',
  authValidateRequest(USER_ROLE.user),
  createNoteController.deletedNote,
);

export const NoteRouter = route;
