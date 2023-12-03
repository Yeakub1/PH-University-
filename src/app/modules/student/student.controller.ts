import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User fetch Successfully',
    data: result,
  });
});

const getAllStudntData = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is created successfuly',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single deleted Successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudntData,
  getSingleStudent,
  deleteStudent,
};
