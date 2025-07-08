import express from 'express';
import validateRequest from '../../middlewares/valiateRequest';
import { NoteZodValidationSchema } from './create.note.zodvalidation';
import { createNoteController } from './note.controller';

const route = express.Router();

route.post(
  '/create-note',
  validateRequest(NoteZodValidationSchema.createNoteZodSchema),
  createNoteController.createNote,
);
route.get('/', createNoteController.getAllNote);
route.get('/:id', createNoteController.getSingleNote);
route.patch(
  '/:_id',
  validateRequest(NoteZodValidationSchema.updateNoteZodSchema),
  createNoteController.updateNote,
);
route.delete('/:_id', createNoteController.deletedNote);

export const NoteRouter = route;
