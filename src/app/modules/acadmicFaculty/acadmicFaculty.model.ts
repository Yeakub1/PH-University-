import { Schema, model } from 'mongoose';
import { TAcadmicFaculty } from './acadmicFaculty.interface';
const acadmicFacultySchema = new Schema<TAcadmicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const AcadmicFaculty = model<TAcadmicFaculty>(
  'AcadmicFaculty',
  acadmicFacultySchema,
);
