import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllStudntData);
router.get('/:id', studentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentController.updatedStudent,
);
router.delete('/:id', studentController.deleteStudent);


export const studentRoute = router;
