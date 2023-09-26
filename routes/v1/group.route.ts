import Router from "@koa/router";

import groupController from "../../controllers/group.controller";
import validate from "../../middlewares/validate";
import userValidation from "../../validations/user.validation";

const router = new Router();

router.post(
  "/",
  // validate(userValidation.createUser),
  groupController.createGroup
);

router.get(
  "/:groupId",
  // validate(userValidation.getUser),
  groupController.getGroup
);

router.get(
  "/:groupId/users/:userId",
  // validate(userValidation.getUser),
  groupController.getGroup
);

export default router;
