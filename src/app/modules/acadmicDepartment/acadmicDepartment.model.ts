
import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
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

acadmicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExit = await AcadmicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExit) {
    throw new Error('Depatment is Already Exit!');
  }
  next();
});

acadmicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExit = await AcadmicDepartment.findOne(query);

  if (!isDepartmentExit) {
    throw new AppError( httpStatus.NOT_FOUND,'This Depatment does not Exit!');
  };
  next();
});

export const AcadmicDepartment = model<TAcadmicDepartment>(
  'AcadmicDepartment',
  acadmicDepartmentSchema,
);
