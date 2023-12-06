import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcadmicFacultyValidation } from './acadmicFaculty.validation';
import { AcadmicFacultyControllers } from './AcadmicFaculty.controller';

const router = express.Router();

router.post(
  '/create-acadmic-faculty',
  validateRequest(AcadmicFacultyValidation.createAcadmicFacultyVlidationSchema),
  AcadmicFacultyControllers.createAcadmicFaculty,
);

router.get('/', AcadmicFacultyControllers.getAllAcademicFacultys);

router.get('/:faculltyId', AcadmicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(AcadmicFacultyValidation.updateAcadmicFacultyVlidationSchema),
  AcadmicFacultyControllers.updateAcademicFaculty,
);

export const AcadmicFacultyRoute = router;
