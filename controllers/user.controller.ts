import { Context } from "koa";
import httpStatus from "http-status";

import { userService } from "../services";

const createUser = async (ctx: Context) => {
  const user = await userService.createUser(ctx.request.body);

  ctx.status = httpStatus.CREATED;
  ctx.body = user;
};

const getUser = async (ctx: Context) => {
  ctx.body = await userService.getUserById(ctx.params.userId);
};

export default { createUser, getUser };
