import { z } from 'zod';

const createAcadmicDepartmentVlidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Acadmic Department must be string',
      required_error: 'Name Is required',
    }),
    acadmicFaculty: z.string({
      invalid_type_error: 'Acadmic Department must be string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateAcadmicDepartmentVlidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Acadmic Department must be string',
      required_error: 'Name Is required',
    }).optional(),
    acadmicFaculty: z.string({
      invalid_type_error: 'Acadmic Department must be string',
      required_error: 'Faculty is required',
    }),
  }).optional(),
});

export const AcadmicDepartmentValidation = {
  createAcadmicDepartmentVlidationSchema,
  updateAcadmicDepartmentVlidationSchema,
};
