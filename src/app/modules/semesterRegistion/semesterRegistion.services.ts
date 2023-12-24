import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import { AcadmicSemester } from './../acadmicSemester/acadmicSemester.model';
import { TSemesterRegistion } from './semesterRegistion.interface';
import { SemesterRegistion } from './semesterRegistion.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistionIntoDB = async (payload: TSemesterRegistion) => {
  const acadmicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester = await SemesterRegistion.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is Already a ${isThereAnyUpcomingOrOngoingSEmester.status} Registion Semester `,
    );
  }

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
    .fields();

  const result = await semesterRegistionQuery.modelQurey;
  return result;
};

const getSingleSemesterRegistionFromDB = async (id: string) => {
  const result = await SemesterRegistion.findById(id);
  return result;
};

const updateSemesterRegistionIntoDB = async (id: string, payload: <TSemesterRegistion>) => {

  const isSemesterRegistonExit = await SemesterRegistion.findById(id);

  if (!isSemesterRegistonExit) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Semester is not found');
  }
  
  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistonExit?.status

  if (currentSemesterStatus === "ENDED") {
    throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}!`);
  }
};

export const SemesterRegistionServices = {
  createSemesterRegistionIntoDB,
  getAllSemesterRegistionFromDB,
  getSingleSemesterRegistionFromDB,
  updateSemesterRegistionIntoDB,
};
