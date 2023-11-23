import { Schema, model } from 'mongoose';
import { Student, UserName, Guardian, localGuardian } from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  fristName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardian = new Schema<localGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  constactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  constactNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bladGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardian,
  profileImage: { type: String },
  isActive: ['Active', 'blocked'],
});


export const StudentModel = model<Student>('Student', studentSchema);