/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: false,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// USER CREATE AND USER SAVE  -> User.create() and User.save()

// User.create() / user.save()
userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
