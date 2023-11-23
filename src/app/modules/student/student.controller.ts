import { Request, Response } from "express";
import { studentServices } from "./student.services";


const createStudent = async(req: Request, res: Response) => {
  try {
    // const { student: studentData } = req.body;
    // console.log(req.body);
    
    const student = req.body.student;
    console.log(student);
    
      const result = await studentServices.createStudentIntoDB(student);
      res.status(200).json({
        success: true,
        message: 'student is created successfuly',
        data: result,
      });
  } catch (error) {
    console.log(error);
    
  }

}

const getAllStudntData = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentDB();
    res.status(200).json({
      success: true,
      message: 'student is created successfuly',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudntData
}