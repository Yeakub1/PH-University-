import { TAcadmicSemester } from '../acadmicSemester/acadmicSemester.interface';
import { User } from './user.modle';


const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030 01 0001
  return lastStudent?.id ? lastStudent?.id : undefined;
};



export const genareateStudentId = async(payload: TAcadmicSemester) => {
 
  let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    const lastStudentSemisterCode = lastStudentId?.substring(4, 6);
    const lastStudentYear = lastStudentId?.substring(0, 4);
    const currentSemisterCode = payload?.code;
    const currentSemisterYear = payload?.year;

    if (
      lastStudentId &&
      lastStudentSemisterCode === currentSemisterCode &&
      lastStudentYear === currentSemisterYear
    ) {
      currentId = lastStudentId?.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
};

