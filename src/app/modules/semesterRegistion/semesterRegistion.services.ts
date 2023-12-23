import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import { AcadmicSemester } from './../acadmicSemester/acadmicSemester.model';
import { TSemesterRegistion } from './semesterRegistion.interface';
import { SemesterRegistion } from './semesterRegistion.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistionIntoDB = async (payload: TSemesterRegistion) => {
  const acadmicSemester = payload?.academicSemester;

  const isAcadmicSemesterExit = await AcadmicSemester.findById(acadmicSemester);
  if (!isAcadmicSemesterExit) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Semester Not Found');
  }

  const isSemesterRegistonExit = await SemesterRegistion.findOne({
    acadmicSemester,
  });

  if (isSemesterRegistonExit) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester already exit');
  }

  const result = await SemesterRegistion.create(payload);
  return result;
};

const getAllSemesterRegistionFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistionQuery = new QueryBuilder(
    SemesterRegistion.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistionQuery.modelQurey;
  return result;
};

const getSingleSemesterRegistionFromDB = async (id: string) => {
  const result = await SemesterRegistion.findById(id);
  return result;
};

const updateSemesterRegistionIntoDB = async (id: string) => {};

export const SemesterRegistionServices = {
  createSemesterRegistionIntoDB,
  getAllSemesterRegistionFromDB,
  getSingleSemesterRegistionFromDB,
  updateSemesterRegistionIntoDB,
};
