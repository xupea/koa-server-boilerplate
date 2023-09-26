import { Context } from "koa";
import httpStatus from "http-status";

import { groupService } from "../services";

const createGroup = async (ctx: Context) => {
  console.log(typeof ctx.request.body.members)
  const group = await groupService.createGroup(ctx.request.body);

  ctx.status = httpStatus.CREATED;
  ctx.body = group;
};

const getGroup = async (ctx: Context) => {
  ctx.body = await groupService.getGroupById(ctx.params.groupId);
};

export default { createGroup, getGroup };
