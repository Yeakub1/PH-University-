import { Model, Types } from 'mongoose';
// import { StudentModel } from './../student.modle';
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  fristName: string;
  middleName: string;
  lastName: string;
};

export type TlocalGuardian = {
  name: string;
  occupation: string;
  constactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  email: string;
  constactNumber: string;
  emergencyContact: string;
  bladGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TlocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
};


// for carating static
export interface studentModle extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExits(id: string): Promise<TStudent | null>
}

