import z from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email must be added' }),
    profileImage: z.string({ required_error: 'profile is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const updatedUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    role: z.enum(['user', 'admin', 'pharmacist']).optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
  }),
});

export const UserZodValidationSchema = {
  createUserZodSchema,
  updatedUserZodSchema,
};
