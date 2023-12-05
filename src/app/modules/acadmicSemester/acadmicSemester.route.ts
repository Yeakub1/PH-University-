import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcadmicSemesterControllers } from './acadmicSemester.controller';
import { acadmicSemesterValidations } from './acadmicSemester.validation';

const router = express.Router();

router.post('/create-acadmic-semester', validateRequest(acadmicSemesterValidations.createAcadmicSemesterValidationSchema), AcadmicSemesterControllers.createAcadmicSemester )

export const AcadmicSemesterRoute = router;
