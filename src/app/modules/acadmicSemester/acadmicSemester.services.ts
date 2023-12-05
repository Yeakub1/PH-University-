import { AcadmicSemester } from './acadmicSemester.model';
import { TAcadmicSemester } from './acadmicSemester.interface';

const createAcadmicSemesterIntoDB = async (payload: TAcadmicSemester) => {
  const result = await AcadmicSemester.create(payload);
  return result;
};
export const acadmicSemesterServices = {
  createAcadmicSemesterIntoDB,
};
