import { AcadmicSemester } from './../acadmicSemester/acadmicSemester.model';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.modle';
import { TUser } from './user.interface';
import { User } from './user.modle';
import { genareateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user role
  const userData: Partial<TUser> = {};

  // if password is not given, use defauld password
  userData.password = password || (config.default_password as string);

  //  set student role
  userData.role = 'student';
  // find acadmic Semester info
  const admissionSemester = await AcadmicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('admission semester is not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await genareateStudentId(admissionSemester);
    const newUser = await User.create([userData], { session });

    // ? create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failde to create User');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //? reference _id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failde to create User');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST,"Faild to Create User")
  }
};

export const UserServices = {
  createStudentIntoDB,
};
