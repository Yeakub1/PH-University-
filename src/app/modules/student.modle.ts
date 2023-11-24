import { Schema, model } from 'mongoose';
import {
  Student,
  UserName,
  Guardian,
  localGuardian,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  fristName: { type: String, required: [true, 'Frist Name is Required'], maxlength:[20,"Name can not be more then 20 careacters"] , trim: true},
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last Name is Required'] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father Name is Required'] },
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
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  constactNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bladGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
      message: 'BladGroup is Required',
    },
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: localGuardian,
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['Active', 'blocked'],
      message: '{VALUE} is not valid',
    },
    default: 'Active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
