import { StudentModel } from "../student.modle";
import { Student } from "./student.interface";

const createStudentIntoDB = async(student: Student) => {
    const result = await StudentModel.create(student);
    return result;
}

const getAllStudentDB = async() => {
    const result = await StudentModel.find({});
    return result;
}

export const studentServices ={
    createStudentIntoDB,
    getAllStudentDB
}