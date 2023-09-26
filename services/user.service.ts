import { User, IUser } from "../models";

const createUser = async (user: IUser) => {
  return User.create(user);
};

const getUserById = async (id: string) => {
  return User.findById(id);
};

export default {
  createUser,
  getUserById,
};
