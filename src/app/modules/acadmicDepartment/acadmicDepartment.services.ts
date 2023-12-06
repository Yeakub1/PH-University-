import { TAcadmicDepartment } from './acadmicDepartment.interface';
import { AcadmicDepartment } from './acadmicDepartment.model';

const createAcadmicDepartmentIntoDB = async (payload: TAcadmicDepartment) => {
  const result = await AcadmicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcadmicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcadmicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcadmicDepartment>,
) => {
  const result = await AcadmicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const acadmicDepartmentServices = {
  createAcadmicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
