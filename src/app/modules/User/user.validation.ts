import { z } from 'zod';

const userVlidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .max(20, { message: 'Password can not be more then 20 characters' })
    .optional(),
});

export const UserValidation = {
  userVlidationSchema,
};
