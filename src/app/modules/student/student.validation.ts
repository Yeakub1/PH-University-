import Joi from "joi";

const userNameSchema = Joi.object({
  fristName: Joi.string().required().max(20).trim(),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  constactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  constactNumber: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bladGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-').required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema,
  profileImage: Joi.string(),
  isActive: Joi.string().valid('Active', 'blocked').default('Active'),
  isDeleted: Joi.boolean()
});

export default studentValidationSchema;