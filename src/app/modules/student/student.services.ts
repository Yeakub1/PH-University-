// import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import { Student } from './student.modle';
// import AppError from '../../errors/appErrors';
// import { User } from '../User/user.modle';
// import { TStudent } from './student.interface';
// import QueryBuilder from '../../builder/QueryBuilder';
// import { studentSearchAbleField } from './student.constant';

// const getAllStudentDB = async (query: Record<string, unknown>) => {
//   const studentQuery = new QueryBuilder(
//     Student.find()
//       .populate('admissionSemester')
//       .populate({
//         path: 'acadmicDepartment',
//         populate: {
//           path: 'acadmicFaculty',
//         },
//       }),
//     query,
//   )
//     .search(studentSearchAbleField)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await studentQuery.modelQurey;
//   return result;
// };

// const getSingleStudentFromDB = async (id: string) => {
//   const result = await Student.findById( id )
//     .populate('admissionSemester')
//     .populate({
//       path: 'acadmicDepartment',
//       populate: {
//         path: 'acadmicFaculty',
//       },
//     });
//   return result;
// };

// const updatedStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
//   const { name, guardian, localGuardian, ...remaingStudnetData } = payload;

//   const modifiedUpdateData: Record<string, unknown> = {
//     ...remaingStudnetData,
//   };

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdateData[`name.${key}`] = value;
//     }
//   }

//   if (guardian && Object.keys(guardian).length) {
//     for (const [key, value] of Object.entries(guardian)) {
//       modifiedUpdateData[`guardian.${key}`] = value;
//     }
//   }

//   if (localGuardian && Object.keys(localGuardian).length) {
//     for (const [key, value] of Object.entries(localGuardian)) {
//       modifiedUpdateData[`localGuardian.${key}`] = value;
//     }
//   }

//   const result = await Student.findByIdAndUpdate(id , modifiedUpdateData, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

// const deleteStudentFromDB = async (id: string) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const deletedStudent = await Student.findOneAndUpdate(
//       { id },
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!deletedStudent) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Faild to deleted student');
//     }

//     const deleteUser = await User.findOneAndUpdate(
//       { id },
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!deleteUser) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Faild to deleted student');
//     }
//     await session.commitTransaction();
//     await session.endSession();

//     return deletedStudent;
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new AppError(httpStatus.BAD_REQUEST, 'Faild to crete student');
//   }
// };

// export const studentServices = {
//   getAllStudentDB,
//   getSingleStudentFromDB,
//   deleteStudentFromDB,
//   updatedStudentFromDB,
// };


import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appErrors';
import { User } from '../User/user.modle';
import { studentSearchAbleField } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.modle';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'acadmicDepartment',
        populate: {
          path: 'acadmicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQurey;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'acadmicDepartment',
      populate: {
        path: 'acadmicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };


  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
