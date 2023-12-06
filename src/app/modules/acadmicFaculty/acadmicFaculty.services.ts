import { AcadmicFaculty } from './acadmicFaculty.model';
import { TAcadmicFaculty } from './acadmicFaculty.interface';

const createAcadmicFacultyIntoDB = async (payload: TAcadmicFaculty) => {
  const result = await AcadmicFaculty.create(payload);
  return result;
}; 

const getAllAcademicFacultysFromDB = async () => {
  const result = await AcadmicFaculty.find();
  return result;
};



const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcadmicFaculty.findById(id);
  return result;
};


const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcadmicFaculty>,
) => {
  const result = await AcadmicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const acadmicFacultyServices = {
  createAcadmicFacultyIntoDB,
  getAllAcademicFacultysFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
