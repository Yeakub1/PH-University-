import express from 'express';
import { SemesterRegistionValidation } from './SemesterRegistion.validation';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistionController } from './SemesterRegistion.controller';

const router = express.Router();

router.post(
  '/create-semester-registion',
  validateRequest(
    SemesterRegistionValidation.createSemesterRegistionValidationSchema,
  ),
  semesterRegistionController.createSemesterRegistion,
);

router.get('/:id', semesterRegistionController.getSingleSemesterRegistion);

router.patch('/:id',
    validateRequest(SemesterRegistionValidation.upadateSemesterRegistionValidationSchema),
  semesterRegistionController.updateSingleSemesterRegistion);

router.get('/', semesterRegistionController.getAllSemesterRegistion);

export const SemesterRegistionRoutes = router;
