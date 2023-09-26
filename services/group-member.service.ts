import { User, IUser } from "../models";

const createGroup = async (user: IUser) => {
  return User.create(user);
};

const getUserById = async (id: string) => {
  return User.findById(id);
};

export default {
  createGroup,
  getUserById,
};
