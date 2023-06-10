import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'Role is required',
      }),
      password: z.string().optional(),
    }),
  }),
});

//   await createUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
};
