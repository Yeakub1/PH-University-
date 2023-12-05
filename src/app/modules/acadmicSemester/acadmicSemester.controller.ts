import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { acadmicSemesterServices } from './acadmicSemester.services';

const createAcadmicSemester = catchAsync(async (req, res) => {
  const result = await acadmicSemesterServices.createAcadmicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcadmicSemester is created successfuly',
    data: result,
  });
});

export const AcadmicSemesterControllers = {
  createAcadmicSemester,
};
