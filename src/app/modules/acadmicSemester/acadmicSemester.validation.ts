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

export const acadmicSemesterValidations = {
  createAcadmicSemesterValidationSchema,
};
