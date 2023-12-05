import { z } from 'zod';
import {
  Months,
  acadmicSemesterCode,
  acadmicSemesterName,
} from './acadmicSemester.constant';

const createAcadmicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...acadmicSemesterName] as [string, ...string[]]),
    code: z.enum([...acadmicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...acadmicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...acadmicSemesterName] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const acadmicSemesterValidations = {
  createAcadmicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};
