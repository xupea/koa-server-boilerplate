import { Schema, model } from "mongoose";

export interface IGroup {
  id: string;
  name: string;
  avatar?: string;
  announcement?: string;
  description?: string;
  type?: string;
  creatorId?: string;
}

const groupSchema = new Schema<IGroup>(
  {
    id: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    announcement: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    type: {
      type: String,
      required: false,
      trim: true,
    },
    creatorId: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = model<IGroup>("Group", groupSchema);

export default User;
