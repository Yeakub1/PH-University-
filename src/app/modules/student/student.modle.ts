import { Schema, model } from 'mongoose';
import validator from 'validator';


import {
  TStudent,
  TUserName,
  TGuardian,
  TlocalGuardian,
  studentModle,
} from './student.interface';
import isEmail from 'validator/lib/isEmail';


const userNameSchema = new Schema<TUserName>({
  fristName: {
    type: String,
    required: [true, 'Frist Name is Required'],
    maxlength: [20, 'Name can not be more then 20 careacters'],
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
    },
    message: '{VALUE} is not valid',
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is Required'] },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardian = new Schema<TlocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  constactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, studentModle>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
    unique: true,
    ref: 'User',
  },
  name: { type: userNameSchema },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: '{VALUE} is not type a email',
    },
  },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});



// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// creating a cousto intance method

studentSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};


export const Student = model<TStudent, studentModle>('Student', studentSchema);
