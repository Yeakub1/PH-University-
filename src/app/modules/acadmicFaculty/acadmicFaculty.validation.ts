import { z } from 'zod';

const createAcadmicFacultyVlidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Acadmic Faculty must be string' }),
  }),
});

const updateAcadmicFacultyVlidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Acadmic Faculty must be string' }),
  }),
});

export const AcadmicFacultyValidation = {
  createAcadmicFacultyVlidationSchema,
  updateAcadmicFacultyVlidationSchema,
};
