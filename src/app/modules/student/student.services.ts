import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from './student.modle';
import AppError from '../../errors/appErrors';
import { User } from '../User/user.modle';
import { TStudent } from './student.interface';

const getAllStudentDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const studentSearchAbleField = ['email', 'name.fristName'];

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  };

  const searchQueary = Student.find({
    $or: studentSearchAbleField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // ? Filtering
  const excluedField = ['searchTerm', 'sort', 'limit'];
  excluedField.forEach((el) => delete queryObj[el]);
  

  const filterQuery =  searchQueary.find(queryObj)
    .populate('acadmicDepartment')
    .populate({
      path: 'acadmicDepartment',
      populate: {
        path: 'acadmicFaculty',
      },
    });

  let sort = '-createAt';

  if (query.sort) {
    sort = query.sort as string
  };

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;

  if (query.limit) {
    limit = query.limit as number
  };

  const limitQuery = await sortQuery.limit(limit)
  
  return limitQuery;
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
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

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
