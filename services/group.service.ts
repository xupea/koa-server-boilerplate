import mongoose from "mongoose";
import { Group, GroupMember, IGroup, IGroupMember } from "../models";

const createGroup = async (data: IGroup & { members: string }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const { members, ...group } = data;

    await Group.create([group], opts);

    const membersArray = JSON.parse(members).map((member: string) => ({
      groupId: group.id,
      userId: member,
    }));
    await GroupMember.create(membersArray, opts);

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getGroupById = async (id: string) => {
  return Group.findById(id);
};

export default {
  createGroup,
  getGroupById,
};
