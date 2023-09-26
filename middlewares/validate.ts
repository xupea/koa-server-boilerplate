import { Context } from "koa";
import httpStatus from "http-status";
import Joi from "joi";

import ApiError from "../utils/ApiError";
import pick from "../utils/pick";

const validate = (schema: any) => async (ctx: Context, next: () => Promise<any>) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(ctx, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return ctx.throw(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  await next();
};

export default validate;
