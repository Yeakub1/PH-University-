import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcadmicDepartmentValidation } from './acadmicDepartment.validation';
import { AcadmicDepartmentControllers } from './AcadmicDepartment.controller';

const router = express.Router();

router.post(
  '/create-acadmic-department',
  validateRequest(
    AcadmicDepartmentValidation.createAcadmicDepartmentVlidationSchema,
  ),
  AcadmicDepartmentControllers.createAcadmicDepartment,
);

router.get('/', AcadmicDepartmentControllers.getAllAcademicDepartments);

router.get(
  '/:departmentId',
  AcadmicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcadmicDepartmentValidation.updateAcadmicDepartmentVlidationSchema,
  ),
  AcadmicDepartmentControllers.updateAcademicDepartment,
);

export const AcadmicDepartmentRoute = router;
