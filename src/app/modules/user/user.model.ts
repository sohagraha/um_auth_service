import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

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
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty',
    //   required: false,
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    //   required: false,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
