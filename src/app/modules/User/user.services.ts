import { AcadmicSemester } from './../acadmicSemester/acadmicSemester.model';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.modle';
import { TUser } from './user.interface';
import { User } from './user.modle';
import { genareateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user role
  const userData: Partial<TUser> = {};

  // if password is not given, use defauld password
  userData.password = password || (config.default_password as string);

  //  set student role
  userData.role = 'student';

  // set genareate id
  // userData.id = '202312104';

  // find acadmic Semester info
  const admissionSemester = await AcadmicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('admission semester is not found');
  }

  userData.id = await genareateStudentId(admissionSemester);

  const newUser = await User.create(userData);

  // ? create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //? reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
