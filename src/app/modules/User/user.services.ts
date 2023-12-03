import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.modle";
import { TUser } from "./user.interface";
import { User } from "./user.modle";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create user role
  const userData: Partial<TUser> = {};

  // if password is not given, use defauld password
  userData.password = password || (config.default_password as string);


  //  set student role
  userData.role = 'student';

  //? set genareate id
  userData.id = '202312104'


  const newUser = await User.create(userData);

  // ? create a student 
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //? reference _id

    const newStudent = await Student.create(studentData);
    return newStudent
  }
};

export const UserServices = {
    createStudentIntoDB
}