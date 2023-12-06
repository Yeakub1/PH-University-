import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { acadmicFacultyServices } from './acadmicFaculty.services';

const createAcadmicFaculty = catchAsync(async (req, res) => {
  const result = await acadmicFacultyServices.createAcadmicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acadmic Faculty is created successfuly',
    data: result,
  });
});

const getAllAcademicFacultys = catchAsync(async (req, res) => {
  const result = await acadmicFacultyServices.getAllAcademicFacultysFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facultys are retrieved successfully',
    data: result,
  });
});


const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await acadmicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved succesfully',
    data: result,
  });
});



const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await acadmicFacultyServices.updateAcademicFacultyIntoDB(
    FacultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved succesfully',
    data: result,
  });
});

export const AcadmicFacultyControllers = {
  createAcadmicFaculty,
  getAllAcademicFacultys,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
