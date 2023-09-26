import { Schema, model } from "mongoose";

export interface IGroupMember {
  /**
   * 群组 id
   */
  groupId: string;
  /**
   * 用户 id
   */
  userId: string;
}

const groupMemberSchema = new Schema<IGroupMember>(
  {
    groupId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const GroupMember = model<IGroupMember>("GroupMember", groupMemberSchema);

export default GroupMember;
