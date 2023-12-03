import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, require: true },
    password: { type: String, require: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'admin', 'faculty'] },
    status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);


// pre save middleware/hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save to data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});


// set '' after saveing password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);