import express from 'express';
import validateRequest from '../../middlewares/valiateRequest';
import { NoteZodValidationSchema } from './create.note.zodvalidation';
import { createNoteController } from './note.controller';
import authValidateRequest from '../../middlewares/authValidationRequesr';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.post(
  '/create-note',
  validateRequest(NoteZodValidationSchema.createNoteZodSchema),
  createNoteController.createNote,
);
route.get(
  '/',
  authValidateRequest(USER_ROLE.user),
  createNoteController.getAllNote,
);
route.get('/:id', createNoteController.getSingleNote);
route.patch(
  '/:_id',
  validateRequest(NoteZodValidationSchema.updateNoteZodSchema),
  createNoteController.updateNote,
);
route.delete('/:_id', createNoteController.deletedNote);

export const NoteRouter = route;
