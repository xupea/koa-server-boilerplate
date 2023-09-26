import Router from "@koa/router";

import userController from "../../controllers/user.controller";
import validate from "../../middlewares/validate";
import userValidation from "../../validations/user.validation";

const router = new Router();

router.post(
  "/",
  validate(userValidation.createUser),
  userController.createUser
);

router.get(
  "/:userId",
  validate(userValidation.getUser),
  userController.getUser
);

export default router;
