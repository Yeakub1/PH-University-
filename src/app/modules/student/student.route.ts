import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/:studentId', studentController.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentController.updatedStudent,
);
router.delete('/:studentId', studentController.deleteStudent);
router.get('/', studentController.getAllStudntData);

export const studentRoute = router;
