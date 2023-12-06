import { Types } from "mongoose";

export type TAcadmicDepartment = {
    name: string;
    acadmicFaculty: Types.ObjectId;
}