import mongoose, { Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './SemesterRegistion.constant';
import { TSemesterRegistion } from './semesterRegistion.interface';

const semesterRegistionSchema = new mongoose.Schema<TSemesterRegistion>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistion = mongoose.model<TSemesterRegistion>(
  'SemesterRegistion',
  semesterRegistionSchema,
);
