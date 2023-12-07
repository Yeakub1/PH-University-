import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from './student.modle';
import AppError from '../../errors/appErrors';
import { User } from '../User/user.modle';
import { TStudent } from './student.interface';

const getAllStudentDB = async () => {
  const result = await Student.find()
    .populate('acadmicDepartment')
    .populate({
      path: 'acadmicDepartment',
      populate: {
        path: 'acadmicFaculty',
      },
    });

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'acadmicDepartment',
      populate: {
        path: 'acadmicFaculty',
      },
    });
  return result;
};

const updatedStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remaingStudnetData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaingStudnetData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  };

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  };

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  };

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to deleted student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to deleted student');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to crete student');
  }
};

export const studentServices = {
  getAllStudentDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updatedStudentFromDB,
};
