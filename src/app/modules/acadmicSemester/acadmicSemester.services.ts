import { Error } from 'mongoose';
import { AcadmicSemester } from './acadmicSemester.model';
import { TAcadmicSemester } from './acadmicSemester.interface';
import { acadmicSemesterNameCodeMapper } from './acadmicSemester.constant';

const createAcadmicSemesterIntoDB = async (payload: TAcadmicSemester) => {

  if (acadmicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcadmicSemester.create(payload);
  return result;
};


const getAllAcademicSemestersFromDB = async () => {
  const result = await AcadmicSemester.find();
  return result;
};


const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcadmicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcadmicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    acadmicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcadmicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};


export const acadmicSemesterServices = {
  createAcadmicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
