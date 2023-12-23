import { Request, Response} from 'express';
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from '../../utils/sendResponse';

const createSemesterRegistion = catchAsync(async (req: Request, res: Response) => {
    
    const result = '';
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SemesterRegistion is Create Successfully',
        data: result,
    });
    
});


const getAllSemesterRegistion = catchAsync(async (req: Request, res: Response) => {
    
    const result = '';
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Semester Registion Face Successfully',
        data: result,
    });
    
});

const getSingleSemesterRegistion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = '';
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semester Registion is face Successfully',
        data: result,
    });
    
});


const updateSingleSemesterRegistion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = '';
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registion is Update Successfully',
        data: result,
    });
    
});

export const semesterRegistionController = {
    createSemesterRegistion,
    getAllSemesterRegistion,
    getSingleSemesterRegistion,
    updateSingleSemesterRegistion
}