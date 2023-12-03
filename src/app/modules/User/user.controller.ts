import { NextFunction, Request } from "express";
import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const {password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(password, studentData);

    // res.status(200).json({
    //   success: true,
    //   message: 'student is created successfuly',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student is created successfuly",
      data: result
    })
  } catch (error) {
    next(error)
  }
};


export const userControllers = {
  createStudent
}