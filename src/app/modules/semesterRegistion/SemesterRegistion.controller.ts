import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistionServices } from './semesterRegistion.services';

const createSemesterRegistion = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistionServices.createSemesterRegistionIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistion is Create Successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistion = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistionServices.getAllSemesterRegistionFromDB(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Semester Registion Resive Successfully',
      data: result,
    });
  },
);



const getSingleSemesterRegistion = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistionServices.getSingleSemesterRegistionFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semester Registion is face Successfully',
      data: result,
    });
  },
);

const updateSingleSemesterRegistion = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

        const result = await SemesterRegistionServices.updateSemesterRegistionIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registion is Update Successfully',
      data: result,
    });
  },
);

export const semesterRegistionController = {
  createSemesterRegistion,
  getAllSemesterRegistion,
  getSingleSemesterRegistion,
  updateSingleSemesterRegistion,
};
