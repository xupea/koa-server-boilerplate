import Joi from "joi";

import { objectId } from "./custom.validation";

const createGroup = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const getGroup = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export default { createGroup, getGroup };
