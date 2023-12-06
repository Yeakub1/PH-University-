import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcadmicSemesterControllers } from './acadmicSemester.controller';
import { acadmicSemesterValidations } from './acadmicSemester.validation';

const router = express.Router();

router.post(
  '/create-acadmic-semester',
  validateRequest(
    acadmicSemesterValidations.createAcadmicSemesterValidationSchema,
  ),
  AcadmicSemesterControllers.createAcadmicSemester
);

router.get('/', AcadmicSemesterControllers.getAllAcademicSemesters);

router.get('/:semesterId', AcadmicSemesterControllers.getSingleAcademicSemester);

router.patch(
  '/:semesterId',
  validateRequest(
    acadmicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcadmicSemesterControllers.updateAcademicSemester
);

export const AcadmicSemesterRoute = router;
