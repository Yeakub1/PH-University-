import express from 'express';
import { studentController } from './student.controller';

const router = express.Router(); 

router.post('/create-student', studentController.createStudent);

router.get('/get-allstudent', studentController.getAllStudntData)

export const studentRoute = router; 