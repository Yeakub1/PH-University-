import { Error, Schema, model } from 'mongoose';
import { TAcadmicSemester } from './acadmicSemester.interface';
import {
  Months,
  acadmicSemesterCode,
  acadmicSemesterName,
} from './acadmicSemester.constant';

const acadmicSemesterSchema = new Schema<TAcadmicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: acadmicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: acadmicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

acadmicSemesterSchema.pre('save', async function (next) {
  const isSemesterExit = await AcadmicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExit) {
    throw new Error('Semester is Already Exits !');
  }
  next();
});

export const AcadmicSemester = model<TAcadmicSemester>(
  'AcadmicSemester',
  acadmicSemesterSchema,
);
