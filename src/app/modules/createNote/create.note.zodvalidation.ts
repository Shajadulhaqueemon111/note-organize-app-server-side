import { z } from 'zod';

const createNoteZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    category: z.string({ required_error: 'Category is required' }),
    isArchived: z.boolean({ required_error: 'isArchived is required' }),
    isDeleted: z.boolean({ required_error: 'isDeleted is required' }),
    userId: z.string({ required_error: 'userId must be added' }),
  }),
});
const updateNoteZodSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    isArchived: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    userId: z.string().optional(),
  }),
});

export const NoteZodValidationSchema = {
  createNoteZodSchema,
  updateNoteZodSchema,
};
