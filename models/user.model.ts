import { Schema, model } from "mongoose";

export interface IUser {
  userId: string;
  nickName: string;
  avatar: string;
  cellphone: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    nickName: {
      type: String,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
    cellphone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
