import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { acadmicDepartmentServices } from './acadmicDepartment.services';

const createAcadmicDepartment = catchAsync(async (req, res) => {
  const result = await acadmicDepartmentServices.createAcadmicDepartmentIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcadmicDepartment is created successfuly',
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await acadmicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result =
    await acadmicDepartmentServices.getSingleAcademicDepartmentFromDB(DepartmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved succesfully',
    data: result,
  });
});




const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result = await acadmicDepartmentServices.updateAcademicDepartmentIntoDB(
    DepartmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved succesfully',
    data: result,
  });
});

export const AcadmicDepartmentControllers = {
  createAcadmicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
