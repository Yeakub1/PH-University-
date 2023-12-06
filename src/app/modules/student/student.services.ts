import { Student } from './student.modle';

const getAllStudentDB = async () => {
  const result = await Student.find()
    .populate('acadmicDepartment')
    .populate({
      path: 'acadmicDepartment',
      populate: {
        path: 'acadmicFaculty',
      },
    });

  return result;
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

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
