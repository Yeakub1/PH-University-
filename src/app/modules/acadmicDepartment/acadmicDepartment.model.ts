import { TAcadmicDepartment } from './acadmicDepartment.interface';
import { Schema, model } from 'mongoose';

const acadmicDepartmentSchema = new Schema<TAcadmicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    acadmicFaculty: { type: Schema.Types.ObjectId, ref: 'AcadmicFaculty' },
  },
  {
    timestamps: true,
  },
);

export const AcadmicDepartment = model<TAcadmicDepartment>(
  'AcadmicDepartment',
  acadmicDepartmentSchema,
);
